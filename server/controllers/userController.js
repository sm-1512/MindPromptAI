import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found in request.",
      });
    }

    const creations = await sql`
      SELECT * 
      FROM creations 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      success: true,
      count: creations.length,
      creations,
    });
  } catch (error) {
    console.error("Error fetching user creations:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user creations.",
    });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * 
      FROM creations 
      WHERE publish = 'true'
      ORDER BY created_at DESC`;

    return res.status(200).json({
      success: true,
      count: creations.length,
      creations,
    });
  } catch (error) {
    console.error("Error fetching published creations:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching published creations.",
    });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const {id} = req.body;

    const [creations] = await sql`
      SELECT * FROM creations 
      WHERE id = ${id}`;

    if (!creations) {
      return res.status(404).json({
        success: false,
        message: "Creation not found.",
      });
    }   

    const currentLikes = creations.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;
    
    if(currentLikes.includes(userIdStr)){
        updatedLikes = currentLikes.filter((user) => user !== userIdStr);
        message = 'Creation Unliked';
    } else {
        updatedLikes = [...currentLikes, userIdStr];
        message = 'Creation Liked';
    }

    const formattedArray = `{${updatedLikes.join(',')}}`;

    await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    return res.status(200).json({
      success: true,
      message,
    });
    
  } catch (error) {
    console.error("Error fetching published creations:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching published creations.",
    });
  }
};

