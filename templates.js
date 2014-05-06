Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n    <li>\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.list", "modelName.underscored", options) : helperMissing.call(depth0, "link-to", "type.list", "modelName.underscored", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.new", "modelName.underscored", options) : helperMissing.call(depth0, "link-to", "type.new", "modelName.underscored", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </li>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "modelName.classified", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push(" + ");
  }

  data.buffer.push("<h2>Welcome to ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "App.config.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h2>\n\n\n<ul>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "modelName", "in", "modelNames", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  return buffer;
  
});
Ember.TEMPLATES["components/display-field"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <ul>\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "val", "in", "value", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            <li>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "val._id", {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </li>\n        ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.display", "val._type", "val._id", options) : helperMissing.call(depth0, "link-to", "type.display", "val._type", "val._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "val.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "val", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isRelation", {hash:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.display", "value._type", "value._id", options) : helperMissing.call(depth0, "link-to", "type.display", "value._type", "value._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program10(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isI18n", {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isArray", {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["components/dynamic-input"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'type': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'value': ("value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isBoolean", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'type': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isNumber", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'type': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("number"),
    'value': ("value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isDate", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'type': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("date"),
    'value': ("value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'type': depth0,'value': depth0};
  hashTypes = {'type': "ID",'value': "ID"};
  options = {hash:{
    'type': ("inputType"),
    'value': ("value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "isText", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["components/generic-field-display"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},inverse:self.program(6, program6, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "i18tem", "in", "field.content", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <span class=\"label secondary\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "i18tem.lang", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                <ul>\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "i18tem.value", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </ul>\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                    <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n                ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            <ul>\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <li>\n                    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </li>\n            ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n                        ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.display", "item.value.type", "item.value._id", options) : helperMissing.call(depth0, "link-to", "type.display", "item.value.type", "item.value._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n                    ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                            ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                        ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.display", "field.content.type", "field.content._id", options) : helperMissing.call(depth0, "link-to", "type.display", "field.content.type", "field.content._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.content.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},inverse:self.program(21, program21, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n                <ul class=\"no-bullet\">\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                </ul>\n            ");
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                    <li>\n                        <span class=\"label secondary\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.lang", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n                        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                    </li>\n                ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.content", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n            ");
  return buffer;
  }

  data.buffer.push("\n<fieldset><legend>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</legend>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.schema.multi", {hash:{},inverse:self.program(13, program13, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</fieldset>\n");
  return buffer;
  
});
Ember.TEMPLATES["components/generic-field-form"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},inverse:self.program(8, program8, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "displayAddButton", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "item.isEditable", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                ");
  hashContexts = {'model': depth0,'isRelation': depth0};
  hashTypes = {'model': "ID",'isRelation': "BOOLEAN"};
  options = {hash:{
    'model': ("item.value"),
    'isRelation': (true)
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['model-form'] || (depth0 && depth0['model-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n                <button class=\"button alert\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeRelation", "item", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">remove</button>\n                <button class=\"button success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doneRelation", "item", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">done</button>\n                <br />\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                <button class=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editRelation", "item", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.value.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </button>\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            ");
  hashContexts = {'field': depth0,'value': depth0};
  hashTypes = {'field': "ID",'value': "ID"};
  options = {hash:{
    'field': ("field"),
    'value': ("item.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n        <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">add</a>\n    ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isRelation", {hash:{},inverse:self.program(22, program22, data),fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.content", {hash:{},inverse:self.program(20, program20, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isEditable", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        ");
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n                ");
  hashContexts = {'model': depth0,'isRelation': depth0};
  hashTypes = {'model': "ID",'isRelation': "BOOLEAN"};
  options = {hash:{
    'model': ("field.content"),
    'isRelation': (true)
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['model-form'] || (depth0 && depth0['model-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n                <button class=\"button alert\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeRelation", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">remove</button>\n                <button class=\"button success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doneRelation", "field", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">done</button>\n                <br />\n\n            ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n                  <button class=\"button\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editRelation", "field", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.content.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n                </button>\n\n            ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">new</a>\n        ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n\n        ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isI18n", {hash:{},inverse:self.program(26, program26, data),fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n            ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "field.content", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            <a ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">add</a>\n\n        ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n              <div class=\"row collapse\">\n                <div class=\"small-2 columns\">\n                    ");
  hashContexts = {'type': depth0,'placeholder': depth0,'classNames': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'placeholder': "STRING",'classNames': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'placeholder': ("lang"),
    'classNames': ("prefix"),
    'value': ("item.lang")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                </div>\n                <div class=\"small-10 columns\">\n                    ");
  hashContexts = {'type': depth0,'placeholder': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'placeholder': "STRING",'value': "ID"};
  options = {hash:{
    'type': ("text"),
    'placeholder': ("value"),
    'value': ("item.value")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n                </div>\n              </div>\n            ");
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            ");
  hashContexts = {'field': depth0,'value': depth0};
  hashTypes = {'field': "ID",'value': "ID"};
  options = {hash:{
    'field': ("field"),
    'value': ("field.content")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['dynamic-input'] || (depth0 && depth0['dynamic-input'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "dynamic-input", options))));
  data.buffer.push("\n        ");
  return buffer;
  }

  data.buffer.push("\n<fieldset><legend>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "field.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</legend>\n\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "field.isMulti", {hash:{},inverse:self.program(13, program13, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</fieldset>\n");
  return buffer;
  
});
Ember.TEMPLATES["components/generic-model-display"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("<small>edit</small>");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n    <p>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "ID"};
  options = {hash:{
    'src': ("model.thumb")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" />\n");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'field': depth0};
  hashTypes = {'field': "ID"};
  options = {hash:{
    'field': ("field")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['field-display'] || (depth0 && depth0['field-display'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "field-display", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("\n<span class=\"label secondary\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.type", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\n<h1>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.edit", "model.type", "model._id", options) : helperMissing.call(depth0, "link-to", "type.edit", "model.type", "model._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</h1>\n\n");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "model.description", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "model.thumb", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n\n");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "field", "in", "fields", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["components/generic-model-form"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    ");
  hashContexts = {'field': depth0};
  hashTypes = {'field': "ID"};
  options = {hash:{
    'field': ("field")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['field-form'] || (depth0 && depth0['field-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "field-form", options))));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "field", "in", "fields", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n  <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>");
  return buffer;
  
});
Ember.TEMPLATES["type/display"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("\n");
  hashContexts = {'model': depth0};
  hashTypes = {'model': "ID"};
  options = {hash:{
    'model': ("model")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['model-display'] || (depth0 && depth0['model-display'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "model-display", options))));
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["type/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("cancel");
  }

  data.buffer.push("\n\n<h1>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n\n");
  hashContexts = {'model': depth0};
  hashTypes = {'model': "ID"};
  options = {hash:{
    'model': ("model")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['model-form'] || (depth0 && depth0['model-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n\n");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.display", "model.type", "model._id", options) : helperMissing.call(depth0, "link-to", "type.display", "model.type", "model._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n<button class=\"button success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">save</button>\n");
  return buffer;
  
});
Ember.TEMPLATES["type/list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\n    <fieldset>\n        <legend>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.type", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</legend>\n        <h2>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.display", "item._type", "item._id", options) : helperMissing.call(depth0, "link-to", "type.display", "item._type", "item._id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("</h2>\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "item.description", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "item.thumb", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    </fieldset>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var hashTypes, hashContexts;
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n            <p>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.description", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</p>\n        ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n            <img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "ID"};
  options = {hash:{
    'src': ("item.thumb")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" />\n        ");
  return buffer;
  }

  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});
Ember.TEMPLATES["type/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("cancel");
  }

  data.buffer.push("\n<h1>New ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.type", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n\n");
  hashContexts = {'model': depth0};
  hashTypes = {'model': "ID"};
  options = {hash:{
    'model': ("model")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['model-form'] || (depth0 && depth0['model-form'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "model-form", options))));
  data.buffer.push("\n\n");
  hashContexts = {'classNames': depth0};
  hashTypes = {'classNames': "STRING"};
  options = {hash:{
    'classNames': ("button")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "type.list", "model.type", options) : helperMissing.call(depth0, "link-to", "type.list", "model.type", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n<button class=\"button success\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">save</button>\n");
  return buffer;
  
});
