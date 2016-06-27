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
});
