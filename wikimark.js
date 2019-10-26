// Require modules.
var fs = require('fs')

// eRegEx: Escapes text used in regular expressions.
String.prototype.eRegEx = function() {
    return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// rElement: Replaces elements.
String.prototype.rElement = function(custom, standard) {
    return this.replace(new RegExp(custom.eRegEx(), 'g'), standard)
}

// (EXPORTED) escape: Escapes text.
exports.escape =  function(text) {

    // Generate & return.
    return text.toString()

        // Tilda.
        .rElement('~~', '&#126;')

        // Square brackets.
        .rElement('~[', '&#91;')
        .rElement('~]', '&#93;')

        // Angle brackets.
        .rElement('~<', '&#60;')
        .rElement('~>', '&#62;')

        // Curly braces.
        .rElement('~{', '&#123;')
        .rElement('~}', '&#125;')

}

// (EXPORTED) tag: Converts tags.
exports.tag = function(text) {

    // Generate & return.
    return text.toString()

        // [={   }=] : Comments out code/text.
        .rElement('[={', '<!--')
        .rElement('}=]', '-->')

        //    [\]    : Inserts a break.
        .rElement('[\\]', '<br>')

        //    [>]    : Inserts a tab (5 non-breaking spaces).
        .rElement('[>]', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

        // [:{   }:] : Creates paragraphs.
        // [:v{  }:] : Creates paragraphs with no trailing whitespace.
        // [:^{  }:] : Creates paragraphs with no leading whitespace.
        // [:^v{  }:] : Creates paragraphs with no leading or trailing whitespace.
        .rElement('[:{',   '<p>')
        .rElement('[:v{',  '<p class="ntws">')
        .rElement('[:^{',  '<p class="nlws">')
        .rElement('[:^v{', '<p class="nlws ntws">')
        .rElement('}:]',   '</p>')

        // [#x{ }#x] : Creates headings of size x.
        .rElement('[#1{', '<h1>')
        .rElement('}#1]', '</h1>')
        .rElement('[#2{', '<h2>')
        .rElement('}#2]', '</h2>')
        .rElement('[#3{', '<h3>')
        .rElement('}#3]', '</h3>')
        .rElement('[#4{', '<h4>')
        .rElement('}#4]', '</h4>')
        .rElement('[#5{', '<h5>')
        .rElement('}#5]', '</h5>')
        .rElement('[#6{', '<h6>')
        .rElement('}#6]', '</h6>')

        // [!{   }!] : Makes text stronger.
        .rElement('[!{', '<strong>')
        .rElement('}!]', '</strong>')

        // [*{   }*] : Emphasizes text.
        .rElement('[*{', '<em>')
        .rElement('}*]', '</em>')

        // [+{   }+] : Notes inserted text.
        .rElement('[+{', '<ins>')
        .rElement('}+]', '</ins>')

        // [-{   }-] : Notes removed text.
        .rElement('[-{', '<del>')
        .rElement('}-]', '</del>')

        // [;{   };] : Creates inline code excerpts.
        .rElement('[;{', '<code>')
        .rElement('};]', '</code>')

        // [;;{ };;] : Creates standalone blocks of code.
        .rElement('[;;{', '<pre>')
        .rElement('};;]', '</pre>')

        // ['{   }'] : Creates block quotations.
        .rElement('[\'{', '<blockquote>')
        .rElement('}\']', '</blockquote>')

        // [/"x"{ }/] : Creates links to url x.
        .rElement('[/"',  '<a href="')
        .rElement('"{', '">')
        .rElement('}/]', '</a>')

}

// (EXPORTED) convert: Escapes & tags text.
exports.convert = function(text) {

    // Generate & return
    return exports.tag(exports.escape(text))

}

// (EXPORTED) escapeFile: Escapes text from a file.
exports.escapeFile = function(path) {

    // Read, generate, & return.
    var text = fs.readFileSync(path)
    return exports.escape(text.toString())

}

// (EXPORTED) tagFile: Converts tags from a file.
exports.tagFile = function(path) {

    // Read, generate, & return.
    var text = fs.readFileSync(path)
    return exports.tag(text.toString())

}

// (EXPORTED) convertFile: Escapes & tags text from a file.
exports.convertFile = function(path) {

    // Read, generate, & return.
    var text = fs.readFileSync(path)
    return exports.tag(exports.escape(text.toString()))

}