import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const { plan, free_usage } = req; // values set in your auth middleware

    // 1. Check usage limits for free users
    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium to continue.",
      });
    }

    // 2. Call AI model to generate article
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // 3. Save creation to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    // 4. Update free usage count if not premium
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    // 5. Send response
    return res.status(200).json({ success: true, content });
  } catch (error) {
    console.error("generateArticle error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the article.",
      error: error.message,
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const { plan, free_usage } = req; // values set in your auth middleware

    // 1. Check usage limits for free users
    if (plan !== "premium" && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium to continue.",
      });
    }

    // 2. Call AI model to generate title
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    // 3. Save creation to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    // 4. Update free usage count if not premium
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    // 5. Send response
    return res.status(200).json({ success: true, content });
  } catch (error) {
    console.error("generateTitle error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the blog title.",
      error: error.message,
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const { plan } = req; // values set in your auth middleware

    //No free_usage variables because it is only available for premium users

    // 1. Check usage limits for free users
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Call AI model to generate image
    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );
    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // 3. Save creation to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish) 
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    // 4. Send response
    return res.status(200).json({ success: true, content: secure_url });
  } catch (error) {
    console.error("generateTitle error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the image.",
      error: error.message,
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const { plan } = req; // values set in your auth middleware

    //No free_usage variables because it is only available for premium users

    // 1. Check usage limits for free users
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Call AI model to remove background
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    // 3. Save creation to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'Remove Background from image' , ${secure_url}, 'image')`;

    // 4. Send response
    return res.status(200).json({ success: true, content: secure_url });
  } catch (error) {
    console.error("generateTitle error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the image.",
      error: error.message,
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const { plan } = req; // values set in your auth middleware

    //No free_usage variables because it is only available for premium users

    // 1. Check usage limits for free users
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Call AI model to remove background
    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    // 3. Save creation to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${`Removed ${object}`} , ${imageUrl}, 'image')`;

    // 4. Send response
    return res.status(200).json({ success: true, content: imageUrl });
  } catch (error) {
    console.error("generateTitle error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the image.",
      error: error.message,
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { plan } = req;
    const { targetRole, targetIndustry } = req.body;
    const resume = req.file;

    // 1. Check if user has premium plan
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Validate resume file
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size exceeds the 5MB limit.",
      });
    }

    if (!resume.mimetype.includes("pdf")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload a PDF resume.",
      });
    }

    // 3. Extract text from PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    // 4. Create AI prompt
    const prompt = `
        Act as an expert Career Coach and professional Resume Reviewer. Your task is to conduct a comprehensive review of the following resume. The candidate is targeting a ${targetRole} role within the ${targetIndustry} industry.

        Please provide a detailed, constructive critique organized into the following sections. Ensure your feedback is specific, actionable, and tailored to the provided target role.

        **1. First Impressions & ATS Compatibility:**
          - Provide a brief, overall impression of the resume. Is it professional, clear, and easy to read?
          - Analyze its compatibility with Applicant Tracking Systems (ATS). Comment on formatting, keywords, and overall structure.

        **2. Section-by-Section Analysis:**
          - **Contact Information:** Is it complete and professional?
          - **Skills:** Are the skills relevant and well-organized for a ${targetRole}? Is there a good mix of languages, frameworks, and tools?
          - **Professional Experience:**
            - Are the descriptions written with strong, impactful action verbs?
            - Are achievements quantified with specific metrics or results (e.g., "Increased X by Y%", "Reduced Z by N hours")?
            - How well does the experience align with the responsibilities of a ${targetRole}?
          - **Projects:**
            - Do the project descriptions clearly state the technologies used (Tech Stack)?
            - Do they effectively demonstrate skills relevant to the target role?
            - Are links to GitHub or live demos included and valuable?
          - **Education & Certifications:** Is this section clear, concise, and supportive of the candidate's goals?

        **3. Key Strengths:**
          - Based on the analysis, list the top 3-5 strengths of this resume that make the candidate a strong applicant for a ${targetRole} position.

        **4. Actionable Areas for Improvement:**
          - Provide a numbered list of the most critical, actionable recommendations for improvement. For each point, explain *why* the change is needed and provide a clear "before and after" example if possible.

        **5. Final Summary & Verdict:**
          - Conclude with a summary of the resume's effectiveness for the target role and provide a final verdict on its readiness for job applications.

        **Resume Content to Review:**
        ${pdfData.text}
        `;

    // 5. Generate AI response
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    // 6. Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'Resume Review Request', ${content}, 'resume-review')
    `;

    // 7. Return success response
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Resume review error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while reviewing the resume.",
    });
  } finally {
    // 8. Clean up uploaded file if necessary
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // remove temp file to avoid clutter
    }
  }
};

export const coverLetterGenerator = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { plan } = req;
    const { jobDescription, companyName, jobTitle } = req.body;
    const resume = req.file;

    // 1. Check if user has premium plan
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Validate resume file
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size exceeds the 5MB limit.",
      });
    }

    if (!resume.mimetype.includes("pdf")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload a PDF resume.",
      });
    }

    // 3. Extract text from PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    // 4. Create AI prompt
    const prompt = `
          Act as an expert Career Coach and professional writer. Your task is to write a compelling and professional cover letter based on the provided resume and job description.

          The cover letter must be:
          1.  **Tailored:** Specifically address the ${companyName} and the ${jobTitle} role.
          2.  **Structured:** Follow a clear introduction, body, and conclusion format.
          3.  **Targeted:** In the body paragraphs, highlight 2-3 key experiences or skills from the resume that directly match the most important requirements listed in the job description.
          4.  **Professional:** Maintain a confident and engaging tone throughout.
          5.  **Concise:** Keep the content to about three or four paragraphs, fitting comfortably on one page.
          6.  **Authentic:** Do NOT invent or exaggerate skills or experiences not found in the resume.

          Here is the necessary information:

          **Candidate's Resume:**
          ${pdfData.text}

          **Job Description for the Role:**
          ${jobDescription}
          `;
    // 5. Generate AI response
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    // 6. Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'Cover Letter Generator', ${content}, 'cover-letter-generator')
    `;

    // 7. Return success response
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Cover Letter Generator error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred generating cover letter.",
    });
  } finally {
    // 8. Clean up uploaded file if necessary
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // remove temp file to avoid clutter
    }
  }
}

export const interviewQuestionsGenerator = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { plan } = req;
    const resume = req.file;

    // 1. Check if user has premium plan
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Validate resume file
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size exceeds the 5MB limit.",
      });
    }

    if (!resume.mimetype.includes("pdf")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload a PDF resume.",
      });
    }

    // 3. Extract text from PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    // 4. Create AI prompt
      const prompt = `
        Act as a Senior Hiring Manager or a Technical Interviewer preparing for an interview. Your task is to generate a set of insightful, high-level interview questions based ONLY on the "PROJECTS" section of the provided resume.

        For each project listed in the resume, generate a list of questions organized into the following three categories:

        **1. Project Overview Questions (Basic):**
          - Ask about the project's goal, the candidate's specific role, and their individual contributions. These questions should be high-level and serve as an icebreaker.

        **2. Technical Deep-Dive Questions (Intermediate):**
          - Focus on the "Tech Stack" mentioned for the project. Ask specific questions about why certain technologies (e.g., React, Node.js, MongoDB, Python) were chosen and how they were implemented.

        **3. Problem-Solving and Architectural Questions (Advanced):**
          - Ask about the most significant challenges faced during the project, any trade-offs that were made, and what the candidate would do differently now. Probe their understanding of system design, scalability, and architectural decisions.

        The questions should be open-ended and designed to reveal the depth of the candidate's technical knowledge and problem-solving skills.

        **Resume Content:**
        ${pdfData.text}
        `;


    // 5. Generate AI response
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = response.choices[0].message.content;

    // 6. Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'Interview Questions Generator', ${content}, 'interview-questions-generator')
    `;

    // 7. Return success response
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Interview Questions Generator error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating questions.",
    });
  } finally {
    // 8. Clean up uploaded file if necessary
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // remove temp file to avoid clutter
    }
  }
}

export const hrQuestionsGenerator = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { plan } = req;
    const resume = req.file;

    // 1. Check if user has premium plan
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // 2. Validate resume file
    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size exceeds the 5MB limit.",
      });
    }

    if (!resume.mimetype.includes("pdf")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload a PDF resume.",
      });
    }

    // 3. Extract text from PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    // 4. Create AI prompt
      const prompt = `
        Act as a Senior HR Manager preparing for a behavioral interview. Your primary goal is to assess a candidate's soft skills, cultural fit, and motivation.

        Your task is to generate a thoughtful set of HR and behavioral interview questions based on the entirety of the provided resume. The questions should be personalized to the candidate's specific background.

        Please organize the questions into the following categories:

        **1. Motivation and Career Goals:**
          - Create questions that explore why the candidate chose their field, what they are passionate about, and what their long-term career aspirations are.

        **2. Behavioral Questions (Based on Experience & Projects):**
          - Analyze the "Professional Experience" and "Projects" sections. Formulate questions that ask the candidate to describe specific situations from their past. These questions should start with phrases like "Tell me about a time when..." or "Describe a situation where...".
          - **For example:** If the resume mentions a project, ask: "Your 'MindPromptAl' project mentions gaining 20+ users. Tell me about the biggest challenge you faced in attracting those first users."

        **3. Teamwork and Collaboration:**
          - Based on their experiences, create questions to understand how they work in a team, handle disagreements, and contribute to a collaborative environment.
          - **For example:** "Your research paper lists you as the 'First and Corresponding Author.' Can you describe how you collaborated with others during this research?"

        **4. Problem-Solving and Adaptability:**
          - Formulate questions that probe the candidate's ability to handle pressure, overcome unexpected challenges, and adapt to new situations. Use their past roles or projects as a backdrop.

        **Resume Content:**
        ${pdfData.text}
        `;


    // 5. Generate AI response
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = response.choices[0].message.content;

    // 6. Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'HR Questions Generator', ${content}, 'hr-questions-generator')
    `;

    // 7. Return success response
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("HR Questions Generator error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating questions.",
    });
  } finally {
    // 8. Clean up uploaded file if necessary
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // remove temp file to avoid clutter
    }
  }
}
