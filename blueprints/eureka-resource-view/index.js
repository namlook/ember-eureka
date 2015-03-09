module.exports = {
  description: 'generate a view for an Eureka resource',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }

  fileMapTokens: function(options) {
    // Return custom tokens to be replaced in your files
    var resource = options.dasherizedModuleName.split('/')[0];
    var viewPath = options.dasherizedModuleName.split('/').slice(1).join('/');
    options.dasherizedModuleName = [resource, 'views', viewPath].join('/');
    return {
      // __outlet__: function(options){
      //   return options.dasherizedModuleName.split('/').slice(0, -1).join('/');
      // }
    };
  }
};
