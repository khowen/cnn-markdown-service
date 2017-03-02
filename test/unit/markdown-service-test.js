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

    it('should remove <em> tags if they surround only spaces', () => {
        const response = this.markdownService.format('<em>  </em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <em> tags if they surround only tabs', () => {
        const response = this.markdownService.format('<em>\t\t</em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <em> tags if they surround only new lines', () => {
        const response = this.markdownService.format('<em>\n\n</em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <em> tags if they surround combinations of whitespace', () => {
        const response = this.markdownService.format('<em>  \t  \n \t</em>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <strong> tags if they surround only spaces', () => {
        const response = this.markdownService.format('<strong>  </strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <strong> tags if they surround only tabs', () => {
        const response = this.markdownService.format('<strong>\t\t</strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <strong> tags if they surround only new lines', () => {
        const response = this.markdownService.format('<strong>\n\n</strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should remove <strong> tags if they surround combinations of whitespace', () => {
        const response = this.markdownService.format('<strong>  \t  \n \t</strong>'),
            expectedResponse = '';

        response.should.equal(expectedResponse);
    });

    it('should properly escape asterisks (*) that are intentional and properly work inside a <strong> tag', () => {
        const response = this.markdownService.format('<strong>*foo</strong>'),
            expectedResponse = '**\\*foo**';

        response.should.equal(expectedResponse);
    });

    it('should properly escape asterisks (*) that are intentional and properly work outside a <strong> tag', () => {
        const response = this.markdownService.format('*<strong>foo</strong>'),
            expectedResponse = '\\***foo**';

        response.should.equal(expectedResponse);
    });


    it('should remove <sub> tags since there is no markdown equivalent', () => {
        const response = this.markdownService.format('<sub>foo</sub>'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should remove <u> tags since there is no markdown equivalent', () => {
        const response = this.markdownService.format('<u>foo</u>'),
            expectedResponse = 'foo';

        response.should.equal(expectedResponse);
    });

    it('should convert <br /> tags to a new line (\\n)', () => {
        const response = this.markdownService.format('foo<br />bar'),
            expectedResponse = 'foo\nbar';

        response.should.equal(expectedResponse);
    });

    it('should convert <br/> tags to a new line (\\n)', () => {
        const response = this.markdownService.format('foo<br/>bar'),
            expectedResponse = 'foo\nbar';

        response.should.equal(expectedResponse);
    });

    it('should convert <br> tags to a new line (\\n)', () => {
        const response = this.markdownService.format('foo<br>bar'),
            expectedResponse = 'foo\nbar';

        response.should.equal(expectedResponse);
    });

    it('should convert <em> tags to an underscore (_)', () => {
        const response = this.markdownService.format('<em>foo</em>'),
            expectedResponse = '_foo_';

        response.should.equal(expectedResponse);
    });

    it('should convert <strong> tags to two asterisks (**)', () => {
        const response = this.markdownService.format('<strong>foo</strong>'),
            expectedResponse = '**foo**';

        response.should.equal(expectedResponse);
    });

    it('should convert <a> tags with absolute urls to proper markdown anchor format', () => {
        const response = this.markdownService.format('<a href="http://www.cnn.com/">CNN</a>'),
            expectedResponse = '[CNN](http://www.cnn.com/)';

        response.should.equal(expectedResponse);
    });

    it('should convert <a> tags with relative urls to proper markdown anchor format', () => {
        const response = this.markdownService.format('<a href="/foo/bar">CNN</a>'),
            expectedResponse = '[CNN](/foo/bar)';

        response.should.equal(expectedResponse);
    });

    it('should convert <a> tags with properties other than href to proper markdown anchor format', () => {
        const response = this.markdownService.format('<a style="foo" href="http://www.cnn.com/" target="_blank">CNN</a>'),
            expectedResponse = '[CNN](http://www.cnn.com/)';

        response.should.equal(expectedResponse);
    });

    it('should convert multiple <a> tags with properties other than href to proper markdown anchor format in the same string', () => {
        const response = this.markdownService.format('<a style="foo" href="http://www.cnn.com/" target="_blank">CNN</a> <a style="bar" href="http://money.cnn.com/" target="_blank">CNN Money</a>'),
            expectedResponse = '[CNN](http://www.cnn.com/) [CNN Money](http://money.cnn.com/)';

        response.should.equal(expectedResponse);
    });

    it('should encode <a> tags with href urls containing un-encoded single quotes', () => {
        const response = this.markdownService.format('<a style="foo" href="https://books.google.com/books?id=0Jm9C06fLFYC&pg=PT44&lpg=PT44&dq=no+one+who+knew+the+president+ever+quite+understood+Chevy+Chase%27s+Saturday+Night+Live+impersonation+of+him+as+a+genial+dolt+who+stumbled+over+doorsteps+and+big+words.+Unfortunately,+the+caricature+--+particularly+the+physical+humor+--+took+on+a+life+of+its+own&source=bl&ots=BH77cAn57_&sig=iRqinzda_s1rcEuNejTPZ2EZlOg&hl=en&sa=X&ved=0ahUKEwjR2P67p4rPAhUEJiYKHeMfAfcQ6AEIITAB#v=onepage&q=no%20one%20who%20knew%20the%20president%20ever%20quite%20understood%20Chevy%20Chase\'s%20Saturday%20Night%20Live%20impersonation%20of%20him%20as%20a%20genial%20dolt%20who%20stumbled%20over%20doorsteps%20and%20big%20words.%20Unfortunately%2C%20the%20caricature%20--%20particularly%20the%20physical%20humor%20--%20took%20on%20a%20life%20of%20its%20own&f=false" target="_blank">According to James Baker</a>'),
            expectedResponse = '[According to James Baker](https://books.google.com/books?id=0Jm9C06fLFYC&pg=PT44&lpg=PT44&dq=no+one+who+knew+the+president+ever+quite+understood+Chevy+Chase%27s+Saturday+Night+Live+impersonation+of+him+as+a+genial+dolt+who+stumbled+over+doorsteps+and+big+words.+Unfortunately,+the+caricature+--+particularly+the+physical+humor+--+took+on+a+life+of+its+own&source=bl&ots=BH77cAn57_&sig=iRqinzda_s1rcEuNejTPZ2EZlOg&hl=en&sa=X&ved=0ahUKEwjR2P67p4rPAhUEJiYKHeMfAfcQ6AEIITAB#v=onepage&q=no%20one%20who%20knew%20the%20president%20ever%20quite%20understood%20Chevy%20Chase%27s%20Saturday%20Night%20Live%20impersonation%20of%20him%20as%20a%20genial%20dolt%20who%20stumbled%20over%20doorsteps%20and%20big%20words.%20Unfortunately%2C%20the%20caricature%20--%20particularly%20the%20physical%20humor%20--%20took%20on%20a%20life%20of%20its%20own&f=false)';

        response.should.equal(expectedResponse);
    });

    it('should encode <a> tags with href urls containing un-encoded parentheses', () => {
        const response = this.markdownService.format('<a style="foo" href="http://www.thelancet.com/journals/langas/article/PIIS2468-1253(16)30026-7/fulltext" target="_blank">study</a>'),
            expectedResponse = '[study](http://www.thelancet.com/journals/langas/article/PIIS2468-1253%2816%2930026-7/fulltext)';

        response.should.equal(expectedResponse);
    });

    it('should convert <h1> tags to prepend a hash (#) before the string', () => {
        const response = this.markdownService.format('<h1>Foo</h1>'),
            expectedResponse = '# Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert <h2> tags to prepend two hashes (##) before the string', () => {
        const response = this.markdownService.format('<h2>Foo</h2>'),
            expectedResponse = '## Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert <h3> tags to prepend three hashs (###) before the string', () => {
        const response = this.markdownService.format('<h3>Foo</h3>'),
            expectedResponse = '### Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert <h4> tags to prepend four hashes (####) before the string', () => {
        const response = this.markdownService.format('<h4>Foo</h4>'),
            expectedResponse = '#### Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert <h5> tags to prepend five hashes (#####) before the string', () => {
        const response = this.markdownService.format('<h5>Foo</h5>'),
            expectedResponse = '##### Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert <h6> tags to prepend six hashes (######) before the string', () => {
        const response = this.markdownService.format('<h6>Foo</h6>'),
            expectedResponse = '###### Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert single digit numbered lists to add \\\\ between the digit and the digit\'s "."', () => {
        const response = this.markdownService.format('1. Foo'),
            expectedResponse = '1\\. Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert double digit numbered lists to add \\\\ between the digit and the digit\'s "."', () => {
        const response = this.markdownService.format('12. Foo'),
            expectedResponse = '12\\. Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert a triple digit numbered lists to add \\\\ between the digit and the digit\'s "."', () => {
        const response = this.markdownService.format('123. Foo'),
            expectedResponse = '123\\. Foo';

        response.should.equal(expectedResponse);
    });

    it('should convert a four digit numbered lists to add \\\\ between the digit and the digit\'s "."', () => {
        const response = this.markdownService.format('1234. Foo'),
            expectedResponse = '1234\\. Foo';

        response.should.equal(expectedResponse);
    });

    it('should not alter a string with a single digit number that is not a numbered list', () => {
        const response = this.markdownService.format('1 Foo'),
            expectedResponse = '1 Foo';

        response.should.equal(expectedResponse);
    });

    it('should not alter a string with a double digit number that is not a numbered list', () => {
        const response = this.markdownService.format('12 Foo'),
            expectedResponse = '12 Foo';

        response.should.equal(expectedResponse);
    });

    it('should not alter a string with a tripel digit number that is not a numbered list', () => {
        const response = this.markdownService.format('123 Foo'),
            expectedResponse = '123 Foo';

        response.should.equal(expectedResponse);
    });

    it('should not alter a string with a four digit number that is not a numbered list', () => {
        const response = this.markdownService.format('1234 Foo'),
            expectedResponse = '1234 Foo';

        response.should.equal(expectedResponse);
    });

    it('should not alter a string with a four digit number at end that is not a numbered list', () => {
        const response = this.markdownService.format('Foo 1234'),
            expectedResponse = 'Foo 1234';

        response.should.equal(expectedResponse);
    });

    it('should return what was passed in if it is not a string, like an array', () => {
        const response = this.markdownService.format(['foo', 'bar']),
            expectedResponse = ['foo', 'bar'];

        response.should.be.an('array');
        response.should.deep.equal(expectedResponse);
    });

    it('should return what was passed in if it is not a string, like an object', () => {
        const response = this.markdownService.format({baz: ['foo', 'bar']}),
            expectedResponse = {baz: ['foo', 'bar']};

        response.should.be.an('object');
        response.should.deep.equal(expectedResponse);
    });

    it('should convert <del></del> tags to ~~ before and after the string', () => {
        const response = this.markdownService.format('<del>Foo</del>'),
            expectedResponse = '~~Foo~~';

        response.should.equal(expectedResponse);
    });
});
