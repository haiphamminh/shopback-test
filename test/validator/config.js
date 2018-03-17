module.exports = {
    /**
     * Root tag from which to find child tags. Its value is by default html
     */
    root_tag: 'html',

    /**
     * This value is used to defect if there are more than STRONG_TAG_LIMIT <strong> tag in HTML
     */
    strong_tag_limit: 15,

    /**
     * The input path of a HTML file to be scanned
     */
    input_path: __dirname + 'input.html',

    /**
     * The output path of the detection result
     */
    output_path: __dirname + '/result.log'
};