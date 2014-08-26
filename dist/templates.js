Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <img class=\"hidden-xs application-logo\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("applicationLogoURL")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"logo\" />\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"eureka-banner-top\"></div>\n<nav class=\"eureka-navbar navbar\" role=\"navigation\">\n    <div class=\"container-fluid\">\n        <div class=\"visible-xs\">\n            <a class=\"navbar-brand\" onclick=\"$('.row-offcanvas').toggleClass('active')\" class=\"btn btn-primary btn-xs\" data-toggle=\"offcanvas\"><i class=\"glyphicon glyphicon-align-justify\"></i></a>\n        </div>\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"#\" alt=\"");
  stack1 = helpers._triageMustache.call(depth0, "applicationName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\">\n                ");
  stack1 = helpers['if'].call(depth0, "applicationLogoURL", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  stack1 = helpers._triageMustache.call(depth0, "applicationName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </a>\n        </div>\n    </div>\n</nav>\n<div class=\"eureka-banner-bottom\"></div>\n\n<div class=\"container-fluid eureka-application \">\n\n    <div class=\"row row-offcanvas row-offcanvas-left\">\n        <div class=\"col-xs-6 col-sm-3 col-lg-2 sidebar-offcanvas eureka-navigation\" role=\"navigation\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers['application-menu'] || (depth0 && depth0['application-menu']),options={hash:{
    'model': ("model"),
    'currentPath': ("currentPath")
  },hashTypes:{'model': "ID",'currentPath': "ID"},hashContexts:{'model': depth0,'currentPath': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "application-menu", options))));
  data.buffer.push("\n        </div>\n        <div class=\"col-xs-12 col-sm-9 col-lg-10 eureka-main-content\">\n            ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n    </div>\n\n</div>\n<div class=\"eureka-footer\"></div>");
  return buffer;
  
})

Ember.TEMPLATES["components/application-menu"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers.unless.call(depth0, "modelMeta.hidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false),
    'active': ("modelMeta.isActive"),
    'classBinding': (":eureka-menu-item modelMeta.EurekaGenericModelModelCSS")
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN",'active': "ID",'classBinding': "STRING"},hashContexts:{'tagName': depth0,'href': depth0,'active': depth0,'classBinding': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modelMeta.indexRouteName", options) : helperMissing.call(depth0, "link-to", "modelMeta.indexRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <a href=\"#\">");
  stack1 = helpers._triageMustache.call(depth0, "modelMeta.pluralizedLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n        ");
  return buffer;
  }

  data.buffer.push("\n<ul class=\"eureka-application-menu nav nav-pills nav-stacked\">\n  ");
  stack1 = helpers.each.call(depth0, "modelMeta", "in", "modelMetas", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>");
  return buffer;
  
})

Ember.TEMPLATES["components/dynamic-input"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"input-group eureka-i18n-field-input\">\n        ");
  stack1 = helpers['if'].call(depth0, "field.displayAllLanguages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("value"),
    'placeholder': ("value"),
    'name': ("dasherizedFieldName"),
    'autocomplete': ("off"),
    'classNames': ("eureka-field-input eureka-i18n-field-value-input form-control")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'name': "ID",'autocomplete': "STRING",'classNames': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'name': depth0,'autocomplete': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        <span class=\"input-group-addon\">\n            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("lang"),
    'placeholder': ("lang"),
    'name': ("dasherizedFieldNameLang"),
    'autocomplete': ("off"),
    'classNames': ("eureka-i18n-field-lang-input")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'name': "ID",'autocomplete': "STRING",'classNames': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'name': depth0,'autocomplete': depth0,'classNames': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n         </span>\n         ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isText", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("value"),
    'name': ("dasherizedFieldName"),
    'autocomplete': ("off"),
    'class': ("eureka-field-input form-control")
  },hashTypes:{'type': "STRING",'value': "ID",'name': "ID",'autocomplete': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'name': depth0,'autocomplete': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isBoolean", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("value"),
    'name': ("dasherizedFieldName"),
    'autocomplete': ("off"),
    'class': ("eureka-field-input form-control")
  },hashTypes:{'type': "STRING",'checked': "ID",'name': "ID",'autocomplete': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'checked': depth0,'name': depth0,'autocomplete': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isNumber", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("number"),
    'value': ("value"),
    'name': ("dasherizedFieldName"),
    'autocomplete': ("off"),
    'class': ("eureka-field-input form-control")
  },hashTypes:{'type': "STRING",'value': "ID",'name': "ID",'autocomplete': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'name': depth0,'autocomplete': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push(" ");
  stack1 = helpers['if'].call(depth0, "isDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['date-picker'] || (depth0 && depth0['date-picker']),options={hash:{
    'value': ("value"),
    'name': ("dasherizedFieldName"),
    'autocomplete': ("off"),
    'class': ("eureka-field-input form-control")
  },hashTypes:{'value': "ID",'name': "ID",'autocomplete': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'name': depth0,'autocomplete': depth0,'class': depth0},inverse:self.noop,fn:self.program(15, program15, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "date-picker", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("inputType"),
    'value': ("value"),
    'name': ("dasherizedFieldName"),
    'autocomplete': ("off"),
    'class': ("eureka-field-input form-control")
  },hashTypes:{'type': "ID",'value': "ID",'name': "ID",'autocomplete': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'name': depth0,'autocomplete': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("\n");
  stack1 = helpers['if'].call(depth0, "isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
})

Ember.TEMPLATES["components/generic_model-display"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "fieldset", "in", "fieldsets", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <fieldset class=\"eureka-fieldset\">\n            ");
  stack1 = helpers['if'].call(depth0, "fieldset.label", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "field", "in", "fieldset.fields", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </fieldset>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<legend>");
  stack1 = helpers._triageMustache.call(depth0, "fieldset.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</legend>");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-field :row field.cssClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    <div class=\"eureka-field-name col-xs-4\">");
  stack1 = helpers._triageMustache.call(depth0, "field.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n                    <div class=\"eureka-field-value col-xs-8\">");
  data.buffer.push(escapeExpression((helper = helpers['model-field-display'] || (depth0 && depth0['model-field-display']),options={hash:{
    'field': ("field")
  },hashTypes:{'field': "ID"},hashContexts:{'field': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-field-display", options))));
  data.buffer.push("</div>\n                </div>\n            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <dl class=\"eureka-document-fields dl-horizontal\">\n    ");
  stack1 = helpers.each.call(depth0, "field", "in", "fields", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </dl>\n");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-field field.cssClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <dt class=\"eureka-field-name\">");
  stack1 = helpers._triageMustache.call(depth0, "field.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</dt>\n            <dd class=\"eureka-field-value\">");
  data.buffer.push(escapeExpression((helper = helpers['model-field-display'] || (depth0 && depth0['model-field-display']),options={hash:{
    'field': ("field")
  },hashTypes:{'field': "ID"},hashContexts:{'field': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-field-display", options))));
  data.buffer.push("</dd>\n        </div>\n    ");
  return buffer;
  }

  data.buffer.push("\n");
  stack1 = helpers['if'].call(depth0, "fieldsets.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
})

Ember.TEMPLATES["components/generic_model-form"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "fieldset", "in", "fieldsets", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <fieldset>\n            ");
  stack1 = helpers['if'].call(depth0, "fieldset.label", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "field", "in", "fieldset.fields", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </fieldset>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<legend>");
  stack1 = helpers._triageMustache.call(depth0, "fieldset.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</legend>");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers.unless.call(depth0, "field.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":form-group :eureka-field field.cssClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                        <label ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'for': ("field.name")
  },hashTypes:{'for': "STRING"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"col-sm-4 control-label eureka-field-name\">");
  stack1 = helpers._triageMustache.call(depth0, "field.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n                        <div class=\"col-sm-8\">\n                            ");
  data.buffer.push(escapeExpression((helper = helpers['model-field-form'] || (depth0 && depth0['model-field-form']),options={hash:{
    'field': ("field")
  },hashTypes:{'field': "ID"},hashContexts:{'field': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-field-form", options))));
  data.buffer.push("\n                        </div>\n                    </div>\n                ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers.each.call(depth0, "field", "in", "fields", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        ");
  stack1 = helpers.unless.call(depth0, "field.isHidden", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":form-group :eureka-field field.cssClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                <label ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'for': ("field.name")
  },hashTypes:{'for': "STRING"},hashContexts:{'for': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"col-sm-4 control-label eureka-field-name\">");
  stack1 = helpers._triageMustache.call(depth0, "field.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n                <div class=\"col-sm-8\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['model-field-form'] || (depth0 && depth0['model-field-form']),options={hash:{
    'field': ("field")
  },hashTypes:{'field': "ID"},hashContexts:{'field': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-field-form", options))));
  data.buffer.push("\n                </div>\n            </div>\n        ");
  return buffer;
  }

  data.buffer.push("\n");
  stack1 = helpers['if'].call(depth0, "fieldsets.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
})

Ember.TEMPLATES["components/generic_model-generic_field-display"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <ul class=\"eureka-i18n-multi-field-values\">\n        ");
  stack1 = helpers['if'].call(depth0, "field.displayAllLanguages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "i18tem", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <li class=\"eureka-i18n-item\">\n                    <span class=\"eureka-i18n-value\">\n                        ");
  stack1 = helpers['if'].call(depth0, "field.isSafeString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </span>\n                    <span class=\"eureka-i18n-lang label label-default\">");
  stack1 = helpers._triageMustache.call(depth0, "i18tem.lang", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                </li>\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                                ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "i18tem.value", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                                ");
  stack1 = helpers._triageMustache.call(depth0, "i18tem.value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "i18tem", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "i18tem.matchSelectedOrFallbackLang", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <li class=\"eureka-i18n-item\">\n                        ");
  stack1 = helpers['if'].call(depth0, "field.isSafeString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </li>\n                ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <ul class=\"eureka-multi-field-values\">\n        ");
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n    ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <li class=\"eureka-multi-field-item\">\n                ");
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(18, program18, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </li>\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("eureka-link-to-display"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "item.value.__meta__.displayRouteName", "item.value._id", options) : helperMissing.call(depth0, "link-to", "item.value.__meta__.displayRouteName", "item.value._id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression((helper = helpers.renderTitle || (depth0 && depth0.renderTitle),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "item.value", options) : helperMissing.call(depth0, "renderTitle", "item.value", options))));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers['if'].call(depth0, "field.isSafeString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "item.value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(27, program27, data),fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("eureka-link-to-display"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "field.content.__meta__.displayRouteName", "field.content._id", options) : helperMissing.call(depth0, "link-to", "field.content.__meta__.displayRouteName", "field.content._id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression((helper = helpers.renderTitle || (depth0 && depth0.renderTitle),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "field.content", options) : helperMissing.call(depth0, "renderTitle", "field.content", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        ");
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(42, program42, data),fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "field.displayAllLanguages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(35, program35, data),fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program29(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <ul class=\"list-unstyled eureka-i18n-field-values\">\n                ");
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </ul>\n            ");
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <li class=\"eureka-i18n-field-item\">\n                        <span class=\"eureka-i18n-value\">\n                        ");
  stack1 = helpers['if'].call(depth0, "field.isSafeString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </span>\n                        <span class=\"eureka-i18n-lang label label-default\">");
  stack1 = helpers._triageMustache.call(depth0, "item.lang", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                    </li>\n                ");
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "item.value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers.each.call(depth0, "i18tem", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program36(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers['if'].call(depth0, "i18tem.matchSelectedOrFallbackLang", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }
function program37(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        ");
  stack1 = helpers['if'].call(depth0, "field.isSafeString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(40, program40, data),fn:self.program(38, program38, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program38(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                            ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "i18tem.value", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "i18tem.value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        ");
  return buffer;
  }

function program42(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "field.isSafeString", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(45, program45, data),fn:self.program(43, program43, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program43(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.content", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program45(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers._triageMustache.call(depth0, "field.content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "field.schema.multi", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
})

Ember.TEMPLATES["components/generic_model-generic_field-form"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n    ");
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <div class=\"eureka-relations-list\">\n        ");
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </div>\n        ");
  stack1 = helpers.unless.call(depth0, "field.isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "item.isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                <div class=\"eureka-new-relation-form\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['model-form'] || (depth0 && depth0['model-form']),options={hash:{
    'model': ("item.value"),
    'isRelation': (true)
  },hashTypes:{'model': "ID",'isRelation': "BOOLEAN"},hashContexts:{'model': depth0,'isRelation': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n                    <button class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeRelation", "item", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">remove</button>\n                    <button class=\"btn btn-success\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doneRelation", "item", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">done</button>\n                </div>\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "item.value._id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-primary :eureka-selected-relation field.name")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editRelation", "item", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "item.value.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" &times;\n                    </button>\n                ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-danger :eureka-selected-relation :eureka-new-relation field.name")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editRelation", "item", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "item.value.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    </button>\n                ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n            ");
  data.buffer.push(escapeExpression((helper = helpers['relation-auto-suggest'] || (depth0 && depth0['relation-auto-suggest']),options={hash:{
    'onSelected': ("add"),
    'placeholder': ("search..."),
    'field': ("field"),
    'nameBinding': ("field.name"),
    'class': ("eureka-field-input")
  },hashTypes:{'onSelected': "STRING",'placeholder': "STRING",'field': "ID",'nameBinding': "STRING",'class': "STRING"},hashContexts:{'onSelected': depth0,'placeholder': depth0,'field': depth0,'nameBinding': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "relation-auto-suggest", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        ");
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  stack1 = helpers['if'].call(depth0, "displayAddButton", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <div class=\"eureka-multi-field-input eureka-i18n-field-inputs\">\n                    ");
  stack1 = helpers['if'].call(depth0, "field.displayAllLanguages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </div>\n            ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input']),options={hash:{
    'field': ("field"),
    'value': ("item.value"),
    'lang': ("item.lang")
  },hashTypes:{'field': "ID",'value': "ID",'lang': "ID"},hashContexts:{'field': depth0,'value': depth0,'lang': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        ");
  stack1 = helpers['if'].call(depth0, "item.matchSelectedLang", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                          ");
  data.buffer.push(escapeExpression((helper = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input']),options={hash:{
    'field': ("field"),
    'value': ("item.value"),
    'lang': ("item.lang")
  },hashTypes:{'field': "ID",'value': "ID",'lang': "ID"},hashContexts:{'field': depth0,'value': depth0,'lang': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                <div class=\"eureka-multi-field-input\">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input']),options={hash:{
    'field': ("field"),
    'value': ("item.value")
  },hashTypes:{'field': "ID",'value': "ID"},hashContexts:{'field': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n                </div>\n            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n            <button class=\"btn btn-default eureka-multi-field-add-input\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">add</button>\n        ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n\n    ");
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(40, program40, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n\n        ");
  stack1 = helpers['if'].call(depth0, "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(38, program38, data),fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "field.isEditable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(33, program33, data),fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "field.content._id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(31, program31, data),fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n            ");
  return buffer;
  }
function program29(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['relation-auto-suggest'] || (depth0 && depth0['relation-auto-suggest']),options={hash:{
    'onSelected': ("add"),
    'placeholder': ("search..."),
    'field': ("field"),
    'nameBinding': ("field.name"),
    'class': ("field-input")
  },hashTypes:{'onSelected': "STRING",'placeholder': "STRING",'field': "ID",'nameBinding': "STRING",'class': "STRING"},hashContexts:{'onSelected': depth0,'placeholder': depth0,'field': depth0,'nameBinding': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "relation-auto-suggest", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    <div class=\"eureka-new-relation-form\">\n                        ");
  data.buffer.push(escapeExpression((helper = helpers['model-form'] || (depth0 && depth0['model-form']),options={hash:{
    'model': ("field.content"),
    'isRelation': (true)
  },hashTypes:{'model': "ID",'isRelation': "BOOLEAN"},hashContexts:{'model': depth0,'isRelation': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n                        <button class=\"btn btn-default\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeRelation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">remove</button>\n                        <button class=\"btn btn-success\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doneRelation", "field", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">done</button>\n                    </div>\n                ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "field.content._id", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(36, program36, data),fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-primary :eureka-selected-relation field.name")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editRelation", "field", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                        ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.content.title", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" &times;\n                    </button>\n                ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                    <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-danger eureka-selected-relation eureka-new-relation field.name")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editRelation", "field", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                        ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.content.title", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n                    </button>\n                ");
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n\n            ");
  data.buffer.push(escapeExpression((helper = helpers['relation-auto-suggest'] || (depth0 && depth0['relation-auto-suggest']),options={hash:{
    'onSelected': ("add"),
    'placeholder': ("search..."),
    'field': ("field"),
    'nameBinding': ("field.name"),
    'class': ("eureka-field-input")
  },hashTypes:{'onSelected': "STRING",'placeholder': "STRING",'field': "ID",'nameBinding': "STRING",'class': "STRING"},hashContexts:{'onSelected': depth0,'placeholder': depth0,'field': depth0,'nameBinding': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "relation-auto-suggest", options))));
  data.buffer.push("\n\n        ");
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        ");
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(49, program49, data),fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program41(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <div class=\"eureka-i18n-field-inputs\">\n            ");
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  stack1 = helpers['if'].call(depth0, "field.displayAllLanguages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(47, program47, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                ");
  stack1 = helpers['if'].call(depth0, "field.displayAllLanguages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(45, program45, data),fn:self.program(43, program43, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program43(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input']),options={hash:{
    'field': ("field"),
    'value': ("item.value"),
    'lang': ("item.lang")
  },hashTypes:{'field': "ID",'value': "ID",'lang': "ID"},hashContexts:{'field': depth0,'value': depth0,'lang': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

function program45(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers['if'].call(depth0, "item.matchSelectedLang", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }

function program47(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n                <button class=\"btn btn-default eureka-i18n-field-add-input\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">add</button>\n            ");
  return buffer;
  }

function program49(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n            ");
  data.buffer.push(escapeExpression((helper = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input']),options={hash:{
    'field': ("field"),
    'value': ("field.content")
  },hashTypes:{'field': "ID",'value': "ID"},hashContexts:{'field': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("\n");
  stack1 = helpers['if'].call(depth0, "field.isMulti", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(25, program25, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
})

Ember.TEMPLATES["components/generic_model-list-table"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <td>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <tr class=\"eureka-item\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "itemClicked", "row.model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n            ");
  stack1 = helpers.each.call(depth0, "field", "in", "row.fields", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tr>\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                <td>\n                ");
  stack1 = helpers['if'].call(depth0, "field.hasContent", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                 </td>\n            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression((helper = helpers['model-field-display'] || (depth0 && depth0['model-field-display']),options={hash:{
    'field': ("field")
  },hashTypes:{'field': "ID"},hashContexts:{'field': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-field-display", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

  data.buffer.push("<table class=\"eureka-document-fields table table-hover\">\n    <thead>\n        <tr>\n        ");
  stack1 = helpers.each.call(depth0, "name", "in", "header", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </tr>\n    </thead>\n    <tbody>\n    ");
  stack1 = helpers.each.call(depth0, "row", "in", "rows", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </tbody>\n</table>");
  return buffer;
  
})

Ember.TEMPLATES["components/generic_model-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    <div class=\"eureka-result-item row\">\n        ");
  stack1 = helpers['if'].call(depth0, "item.thumbUrl", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("item.thumbUrl:col-xs-8")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <h3 class=\"eureka-item-title\">\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("eureka-link-to-display"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "item.__meta__.displayRouteName", "item._id", options) : helperMissing.call(depth0, "link-to", "item.__meta__.displayRouteName", "item._id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </h3>\n\n\n            <p class=\"eureka-item-description\">");
  data.buffer.push(escapeExpression((helper = helpers.renderDescription || (depth0 && depth0.renderDescription),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "item", options) : helperMissing.call(depth0, "renderDescription", "item", options))));
  data.buffer.push("</p>\n        </div>\n    </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            <div class=\"eureka-thumb col-xs-4\">\n                ");
  stack1 = (helper = helpers['cropped-thumb'] || (depth0 && depth0['cropped-thumb']),options={hash:{
    'model': ("item"),
    'class': ("eureka-item-thumb")
  },hashTypes:{'model': "ID",'class': "STRING"},hashContexts:{'model': depth0,'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "cropped-thumb", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.renderTitle || (depth0 && depth0.renderTitle),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "item", options) : helperMissing.call(depth0, "renderTitle", "item", options))));
  data.buffer.push("\n                ");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "item", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
})

Ember.TEMPLATES["components/search-query"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  stack1 = (helper = helpers['search-query-input'] || (depth0 && depth0['search-query-input']),options={hash:{
    'action': ("searchModel"),
    'model': ("model")
  },hashTypes:{'action': "STRING",'model': "ID"},hashContexts:{'action': depth0,'model': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "search-query-input", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<div class=\"eureka-hint\"><p class=\"eureka-hint-message\">Hit enter key to search</p></div>\n");
  return buffer;
  
})

Ember.TEMPLATES["generic_model/__description__"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.description.localValue", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program3(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.description", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

  stack1 = helpers['if'].call(depth0, "model.description.isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
})

Ember.TEMPLATES["generic_model/__title__"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title.localValue", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program4(depth0,data) {
  
  
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  }

function program6(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "_id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

  stack1 = helpers['if'].call(depth0, "title.isI18n", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
})

Ember.TEMPLATES["generic_model/display"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            <div class=\"col-xs-4\">\n                ");
  stack1 = (helper = helpers['cropped-thumb'] || (depth0 && depth0['cropped-thumb']),options={hash:{
    'model': ("model"),
    'class': ("eureka-document-thumb")
  },hashTypes:{'model': "ID",'class': "STRING"},hashContexts:{'model': depth0,'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "cropped-thumb", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </div>\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("<span class=\"label label-default\">");
  stack1 = helpers._triageMustache.call(depth0, "model.__meta__.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n            <li><a href=\"#\"\n                ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-action :eureka-main-action modelAction.cssClass model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "trigger", "modelAction.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                    ");
  stack1 = helpers['if'].call(depth0, "modelAction.iconClass", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </a>\n            </li>\n        ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        <i ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("modelAction.iconClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></i> <span class=\"hidden-xs\">");
  stack1 = helpers._triageMustache.call(depth0, "modelAction.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "modelAction.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <li class=\"dropdown pull-right\">\n            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n              <span class=\"glyphicon glyphicon-cog\"></span> <span class=\"caret\"></span>\n            </a>\n            <ul class=\"dropdown-menu\">\n                ");
  stack1 = helpers.each.call(depth0, "modelAction", "in", "secondaryModelActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </ul>\n        </li>\n        ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    <li><a href=\"#\"\n                        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-action :eureka-secondary-action modelAction.cssClass model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                        ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "trigger", "modelAction.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n                            <i ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("modelAction.iconClass")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></i> ");
  stack1 = helpers._triageMustache.call(depth0, "modelAction.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                        </a>\n                    </li>\n                ");
  return buffer;
  }

  data.buffer.push("<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-document model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n\n    <div class=\"eureka-head row\">\n        ");
  stack1 = helpers['if'].call(depth0, "model.thumbUrl", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("model.thumbUrl:col-xs-8")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n            <div class=\"eureka-document-head-title\">\n                <p>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model.__meta__.indexRouteName", options) : helperMissing.call(depth0, "link-to", "model.__meta__.indexRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                <h1 ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-document-title model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.renderTitle || (depth0 && depth0.renderTitle),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model", options) : helperMissing.call(depth0, "renderTitle", "model", options))));
  data.buffer.push("\n                </h1>\n            </div>\n            <div class=\"eureka-document-description\">\n                <p>");
  data.buffer.push(escapeExpression((helper = helpers.renderDescription || (depth0 && depth0.renderDescription),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model", options) : helperMissing.call(depth0, "renderDescription", "model", options))));
  data.buffer.push("</p>\n            </div>\n        </div>\n    </div>\n\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\"><a href=\"#\">Informations</a></li>\n    </ul>\n\n    <ul class=\"eureka-actions nav nav-pills pull-right\">\n        ");
  stack1 = helpers.each.call(depth0, "modelAction", "in", "mainModelActions", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  stack1 = helpers['if'].call(depth0, "secondaryModelActions.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n\n    ");
  data.buffer.push(escapeExpression((helper = helpers['model-display'] || (depth0 && depth0['model-display']),options={hash:{
    'model': ("model")
  },hashTypes:{'model': "ID"},hashContexts:{'model': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-display", options))));
  data.buffer.push("\n</div>");
  return buffer;
  
})

Ember.TEMPLATES["generic_model/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("cancel");
  }

  data.buffer.push("\n\n<h1>");
  data.buffer.push(escapeExpression((helper = helpers.renderTitle || (depth0 && depth0.renderTitle),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model", options) : helperMissing.call(depth0, "renderTitle", "model", options))));
  data.buffer.push("</h1>\n\n<form class=\"form-horizontal\" role=\"form\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers['model-form'] || (depth0 && depth0['model-form']),options={hash:{
    'model': ("model")
  },hashTypes:{'model': "ID"},hashContexts:{'model': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n\n     <div class=\"form-group\">\n        <div class=\"col-sm-offset-4 col-sm-8\">\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn btn-default eureka-cancel-action eureka-link-to-display"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["ID","ID"],data:data},helper ? helper.call(depth0, "model.__meta__.displayRouteName", "model._id", options) : helperMissing.call(depth0, "link-to", "model.__meta__.displayRouteName", "model._id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-primary :eureka-save-action model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">save</button>\n        </div>\n    </div>\n</form>\n\n");
  return buffer;
  
})

Ember.TEMPLATES["generic_model/list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                + Create ");
  stack1 = helpers._triageMustache.call(depth0, "model.__meta__.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false),
    'classNames': ("eureka-link-to-index"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN",'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'tagName': depth0,'href': depth0,'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model.__meta__.indexRouteName", options) : helperMissing.call(depth0, "link-to", "model.__meta__.indexRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  stack1 = helpers.each.call(depth0, "filter", "in", "filters", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("\n                    <a href=\"#\">All</a>\n            ");
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li"),
    'href': (false),
    'classNames': ("eureka-filter-to"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'tagName': "STRING",'href': "BOOLEAN",'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'tagName': depth0,'href': depth0,'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "filter.route", options) : helperMissing.call(depth0, "link-to", "filter.route", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                        <a href=\"#\">\n                            <i ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("filter.icon")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></i>\n                            <span class=\"hidden-xs\">");
  stack1 = helpers._triageMustache.call(depth0, "filter.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n                        </a>\n                ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <div class=\"form-group eureka-sortby-selection\">\n            order by ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("sorting"),
    'optionValuePath': ("content.order"),
    'optionLabelPath': ("content.label"),
    'value': ("currentSorting")
  },hashTypes:{'content': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'value': "ID"},hashContexts:{'content': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        </div>\n    ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        \n        ");
  data.buffer.push(escapeExpression((helper = helpers['model-list-table'] || (depth0 && depth0['model-list-table']),options={hash:{
    'model': ("model"),
    'itemClicked': ("displayItem")
  },hashTypes:{'model': "ID",'itemClicked': "STRING"},hashContexts:{'model': depth0,'itemClicked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-list-table", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n        \n        ");
  data.buffer.push(escapeExpression((helper = helpers['model-list'] || (depth0 && depth0['model-list']),options={hash:{
    'model': ("model")
  },hashTypes:{'model': "ID"},hashContexts:{'model': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-list", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

  data.buffer.push("\n<div class=\"eureka-title-section\">\n    <div class=\"col-xs-7 col-sm-7\">\n        <h1> ");
  stack1 = helpers._triageMustache.call(depth0, "model.__meta__.pluralizedLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </h1>\n\n\n    </div>\n    <div class=\"col-xs-5 col-sm-5 text-right eureka-link-to-new-section\">\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn btn-default eureka-link-to-new"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model.__meta__.newRouteName", options) : helperMissing.call(depth0, "link-to", "model.__meta__.newRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n</div>\n\n<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":eureka-filter-section filters.length::eureka-filter-section-empty")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    <ul class=\"nav nav-tabs\">\n        ");
  stack1 = helpers['if'].call(depth0, "filters.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n</div>\n\n<form class=\"eureka-search-section form-inline text-right\" role=\"form\">\n    <div class=\"form-group has-feedback eureka-search-query-container\">\n        <span class=\"glyphicon glyphicon-search form-control-feedback search-icon\"></span>\n        ");
  stack1 = (helper = helpers['search-query'] || (depth0 && depth0['search-query']),options={hash:{
    'action': ("searchModel"),
    'model': ("model")
  },hashTypes:{'action': "STRING",'model': "ID"},hashContexts:{'action': depth0,'model': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "search-query", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n    ");
  stack1 = helpers['if'].call(depth0, "sorting.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</form>\n\n\n<div class=\"eureka-results clearfix\">\n    ");
  stack1 = helpers['if'].call(depth0, "tableView", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n");
  return buffer;
  
})

Ember.TEMPLATES["generic_model/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n                    cancel\n            ");
  }

  data.buffer.push("\n<h1 class=\"eureka-new-document-title\">New ");
  stack1 = helpers._triageMustache.call(depth0, "model.__meta__.label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h1>\n\n<form class=\"form-horizontal eureka-new-document-form\" role=\"form\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers['model-form'] || (depth0 && depth0['model-form']),options={hash:{
    'model': ("model")
  },hashTypes:{'model': "ID"},hashContexts:{'model': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n\n     <div class=\"form-group\">\n        <div class=\"col-sm-offset-4 col-sm-8\">\n            ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'classNames': ("btn btn-default eureka-cancel-action eureka-link-to-index"),
    'classNameBindings': ("model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'classNames': "STRING",'classNameBindings': "STRING"},hashContexts:{'classNames': depth0,'classNameBindings': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "model.__meta__.indexRouteName", options) : helperMissing.call(depth0, "link-to", "model.__meta__.indexRouteName", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <button ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":btn :btn-primary :eureka-save-action model.__meta__.EurekaGenericModelModelCSS")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("\n                    ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">save</button>\n        </div>\n    </div>\n</form>");
  return buffer;
  
})