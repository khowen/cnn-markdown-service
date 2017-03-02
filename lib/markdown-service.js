/*
 * Copyright 2016 Turner Broadcasting System, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Formats HTML tags in strings as Markdown.  The intent is that each "string"
 * is a "paragraph".
 *
 * @example
 * const MarkdownService = require('cnn-markdown-service'),
 *     md = new MarkdownService(),
 *     paragraphs = [
 *         'I see it in the <a href="http://www.nytimes.com/2015/03/11/opinion/a-sensible-bill-on-medical-marijuana.html?_r=0" target="_blank">op-ed pages of the newspapers</a>, and on the state ballots in nearly half the country. I see it in politicians who once preferred to play it safe with this explosive issue but are now willing to stake their political futures on it. I see the revolution in the eyes of sterling scientists, previously reluctant to dip a toe into this heavily stigmatized world, who are diving in head first. I see it in the <a href="http://www.cnn.com/video/data/2.0/video/health/2015/04/16/gupta-murthy-medical-marijuana.cnn.html" target="_blank">new surgeon general</a> who cites data showing just how helpful it can be.',
 *         'I see a revolution in the attitudes of everyday Americans. For the first time a majority, <a href="http://www.people-press.org/2015/04/14/in-debate-over-legalizing-marijuana-disagreement-over-drugs-dangers/" target="_blank">53%, favor its legalization</a>, with <a href="http://www.people-press.org/2013/04/04/majority-now-supports-legalizing-marijuana/" target="_blank">77% supporting it for medical purposes</a>.'
 *     ];
 *
 * paragraphs.forEach((paragraph) => {
 *     console.log(md.format(paragraph));
 * });
 */
class MarkdownService {
    /**
     * Formats HTML tags in strings as Markdown.
     *
     * @param {String} data
     * A string with HTML tags that need to be formatted as Markdown.
     *
     * @returns {String}
     * Returns the string with HTML tags formatted as Markdown.
     */
    format(data) {
        if (typeof data === 'string') {
            // trim all leading and trailing whitespace
            data = data.trim();

            // convert two dashes to an emdash, if they are surrounded by whitespace
            data = data.replace(/(\s)--(\s)/g, '$1—$2');

            // remove known tags that do not wrap content, or only wrap whitespace
            data = data.replace(/<em>\s*<\/em>/g, '');
            data = data.replace(/<strong>\s*<\/strong>/g, '');

            // remove tags that have no markdown equivalent
            data = data.replace(/<sub>|<\/sub>/g, '');
            data = data.replace(/<u>|<\/u>/g, '');

            // convert HTML to Markdown
            data = data.replace(/<br\s*\/>/g, '\n');
            data = data.replace(/<br>/g, '\n');
            data = data.replace(/<em>|<\/em>/g, '_');
            data = data.replace(/\*/, '\\*');
            data = data.replace(/<strong>|<\/strong>/g, '**');
            data = data.replace(/<del>|<\/del>/g, '~~');

            // add escape for numbered lists
            // https://regex101.com/r/SO5haw/1
            if (data.match(/^\d{1,4}\./)) {
                // https://regex101.com/r/nB8bV3/4
                data = data.replace(/(^\d{1,4})(.)/, '$1\\$2');
            }

            if (data.match(/<a.*>|<\/a>/)) {
                // https://regex101.com/r/zQ7rD3/2
                data = data.replace(/<a.+?href="(.+?)".*?>(.+?)<\/a>/g, (match, p1, p2) => {
                    // encode spaces in urls
                    p1 = p1.replace(/\s+/g, '%20');
                    // encode single quotes in urls
                    p1 = p1.replace(/'/g, '%27');
                    // encode parentheses in urls
                    p1 = p1.replace(/\(/g, '%28');
                    p1 = p1.replace(/\)/g, '%29');

                    return `[${p2}](${p1})`;
                });
            }

            if (data.match(/^<h\d>.*<\/h\d>$/)) {
                data = `${'#'.repeat(data.match(/^<h(\d)>/)[1])} ${data.replace(/<h\d>|<\/h\d>/g, '')}`;
            }
        }

        return data;
    }
}



module.exports = MarkdownService;
