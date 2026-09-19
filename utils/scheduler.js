const cron = require("node-cron");
const User = require("../models/user");

/**
 * Executes the user cleanup process:
 * Deletes all users except:
 * 1. User with developer email
 * 2. The most recently registered user (highest _id)
 */
const cleanupUsers = async () => {
  try {
    const latestUser = await User.findOne().sort({ _id: -1 });
    const query = {
      email: { $ne: process.env.DEV_MAIL },
    };
    if (latestUser) {
      query._id = { $ne: latestUser._id };
    }
    const result = await User.deleteMany(query);
    console.log(
      `[Scheduler] User cleanup completed successfully. Deleted ${result.deletedCount} users.`
    );
    return result;
  } catch (error) {
    console.error("[Scheduler] Error during user cleanup:", error);
  }
};

/**
 * Initializes the cron scheduler to run at 00:00 on January 1st every year ('0 0 1 1 *')
 */
const initScheduler = () => {
  cron.schedule("0 0 1 1 *", async () => {
    await cleanupUsers();
  });
  console.log("[Scheduler] User cleanup cron initialized (Scheduled for Jan 1st 00:00).");
};

module.exports = {
  initScheduler,
  cleanupUsers,
};
