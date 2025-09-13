const parseDuration = (str: string): number => {
  /*
    str: String like 1d, 4h, 5d
    // it will return valeu in seconds 
  */
  const match = str.match(/^(\d+)([smhd])$/); // supports s, m, h, d
  if (!match) throw new Error("Invalid duration format");

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value; // seconds
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      throw new Error("Unsupported unit");
  }
};
export default parseDuration;
