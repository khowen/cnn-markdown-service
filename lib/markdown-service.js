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


class MarkdownService {
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
            data = data.replace(/<strong>|<\/strong>/g, '**');

            if (data.match(/<a.*>|<\/a>/)) {
                // https://regex101.com/r/zQ7rD3/1
                data = data.replace(/<a href="(.+?)".*?>(.+?)<\/a>/g, (match, p1, p2) => {
                    // encode spaces in urls
                    p1 = p1.replace(/\s+/g, '%20');

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
