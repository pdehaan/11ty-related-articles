const inspect = require("util").inspect;

module.exports = eleventyConfig => {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("dump", inspect);

  eleventyConfig.addFilter("featured", (collection = [], related = []) => {
    return collection.filter(page => related.includes(page.fileSlug));
  });

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
