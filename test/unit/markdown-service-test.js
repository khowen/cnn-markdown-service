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


describe('Markdown Service', () => {
    beforeEach(() => {
        this.markdownService = new MarkdownService();
    });

    afterEach(() => {
        delete this.markdownService;
    });



    it('should instantiate properly when created properly', () => {
        this.markdownService.should.be.an.instanceof(MarkdownService);
    });

    it('should trim trailing spaces', () => {
        const response = this.markdownService.format('foo  '),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should trim leading spaces', () => {
        const response = this.markdownService.format('  foo'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should trim trailing tabs', () => {
        const response = this.markdownService.format('foo\t\t'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should trim leading tabs', () => {
        const response = this.markdownService.format('\t\tfoo'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should trim trailing eol characters', () => {
        const response = this.markdownService.format('foo\n\n'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should trim leading eol characters', () => {
        const response = this.markdownService.format('\n\nfoo'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should convert two dashes (--) to an emdash (—) if they are surrounded by non-leading or trailing whitespace', () => {
        const response = this.markdownService.format('foo -- bar'),
            expectedResponse = 'foo — bar';

        response.should.equal(expectedResponse);
    });

    it('should convert multiple groups two dashes (--) to an emdash (—) if they are surrounded by non-leading or trailing whitespace and separated by something other than whitespace', () => {
        const response = this.markdownService.format('foo -- baz -- bar'),
            expectedResponse = 'foo — baz — bar';

        response.should.equal(expectedResponse);
    });

    it('Should remove <em> tags if they surround only spaces', () => {
        const response = this.markdownService.format('<em>  </em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <em> tags if they surround only tabs', () => {
        const response = this.markdownService.format('<em>\t\t</em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <em> tags if they surround only new lines', () => {
        const response = this.markdownService.format('<em>\n\n</em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <em> tags if they surround combinations of whitespace', () => {
        const response = this.markdownService.format('<em>  \t  \n \t</em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <strong> tags if they surround only spaces', () => {
        const response = this.markdownService.format('<strong>  </strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <strong> tags if they surround only tabs', () => {
        const response = this.markdownService.format('<strong>\t\t</strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <strong> tags if they surround only new lines', () => {
        const response = this.markdownService.format('<strong>\n\n</strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <strong> tags if they surround combinations of whitespace', () => {
        const response = this.markdownService.format('<strong>  \t  \n \t</strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('Should remove <sub> tags since there is no markdown equivalent', () => {
        const response = this.markdownService.format('<sub>foo</sub>'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('Should remove <u> tags since there is no markdown equivalent', () => {
        const response = this.markdownService.format('<u>foo</u>'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('Should convert <br /> tags to a new line (\\n)', () => {
        const response = this.markdownService.format('foo<br />bar'),
            expectedResponse = 'foo\nbar';

        response.should.equal(expectedResponse);
    });

    it('Should convert <br/> tags to a new line (\\n)', () => {
        const response = this.markdownService.format('foo<br/>bar'),
            expectedResponse = 'foo\nbar';

        response.should.equal(expectedResponse);
    });

    it('Should convert <br> tags to a new line (\\n)', () => {
        const response = this.markdownService.format('foo<br>bar'),
            expectedResponse = 'foo\nbar';

        response.should.equal(expectedResponse);
    });

    it('Should convert <em> tags to an underscore (_)', () => {
        const response = this.markdownService.format('<em>foo</em>'),
            expectedResponse = '_foo_';

        response.should.equal(expectedResponse);
    });

});
