module.exports = {
  description: '',

  locals: function(options) {
    // Return custom template variables here.
    return {
      resource: options.entity.name,
      resourcePluralName: options.entity.name+'s'
    };
  }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
