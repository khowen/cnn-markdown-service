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

/*
 * Run this example with:
 *     $ node example/example.js
 */

'use strict';

const MarkdownService = require('../lib/markdown-service.js'),
    md = new MarkdownService(),
    paragraphs = [
        'I see signs of a revolution everywhere.',
        'I see it in the <a href="http://www.nytimes.com/2015/03/11/opinion/a-sensible-bill-on-medical-marijuana.html?_r=0" target="_blank">op-ed pages of the newspapers</a>, and on the state ballots in nearly half the country. I see it in politicians who once preferred to play it safe with this explosive issue but are now willing to stake their political futures on it. I see the revolution in the eyes of sterling scientists, previously reluctant to dip a toe into this heavily stigmatized world, who are diving in head first. I see it in the <a href="http://www.cnn.com/video/data/2.0/video/health/2015/04/16/gupta-murthy-medical-marijuana.cnn.html" target="_blank">new surgeon general</a> who cites data showing just how helpful it can be.',
        'I see a revolution in the attitudes of everyday Americans. For the first time a majority, <a href="http://www.people-press.org/2015/04/14/in-debate-over-legalizing-marijuana-disagreement-over-drugs-dangers/" target="_blank">53%, favor its legalization</a>, with <a href="http://www.people-press.org/2013/04/04/majority-now-supports-legalizing-marijuana/" target="_blank">77% supporting it for medical purposes</a>.',
        'Support for legalization has risen 11 points in the past few years alone. In 1969, the first time Pew asked the question about legalization, only 12% of the nation was in favor.',
        'I see a revolution that is burning white hot among young people, but also shows up among the parents and grandparents in my kids\' school. A police officer I met in Michigan is part of the revolution, as are the editors of the medical journal, <a href="http://journals.lww.com/neurosurgery/Fulltext/2015/04000/WEED___Marijuana,_Medicine_and_Neuroscience_.11.aspx#" target="_blank">Neurosurgery</a>. I see it in the faces of good parents, uprooting their lives to get medicine for their children -- and in the children themselves, <a href="http://www.cnn.com/2013/08/07/health/charlotte-child-medical-marijuana/">such as Charlotte</a>, who went from having 300 seizures a week to just one or two a month. We know it won\'t consistently have such dramatic results (or any impact at all) in others, but what medicine does?',
        'I see this medical marijuana revolution in surprising places.',
        '<a href="http://www.cnn.com/2015/04/16/us/georgia-medical-marijuana-bill-signing-haleigh-cox/index.html" target="_blank">Girl\'s seizures spur medical marijuana legislation in Georgia</a>',
        'Among my colleagues, my patients and my friends. I have even seen the revolution in my own family. A few years ago, when I told my mother I was investigating the topic for a documentary, I was met with a long pause.',
        '"Marijuana...?" She whispered in a half questioning, half disapproving tone. She could barely even say the word and her response filled me with self-doubt. Even as a grown man, mom can still make my cheeks turn red and shatter my confidence with a single word. But just last week she suddenly stopped mid-conversation and said, "I am proud of you on the whole marijuana thing." I waited for the other shoe to drop, but it didn\'t. Instead, she added, "You probably helped a lot of people who were suffering."',
        'I don\'t think we had ever had a conversation like that one. At that moment, I saw a revolution that can bring you to tears.',
        'The word revolution, comes from the Latin <em>revolutio</em>, to "turn around."',
        'I had <a href="http://www.cnn.com/2013/08/08/health/gupta-changed-mind-marijuana/">my own turn around</a> a couple of years ago, and at the time it was a lonely place to hold a supportive position on medical marijuana. Hardly any government officials would agree to sit down and be interviewed on the topic. Even patients I spoke to were reluctant to share their stories.',
        'It can be tricky, I learned, to be on the right side of science but on the wrong side of ideology.',
        'When we put the first "Weed" documentary on television in August 2013, I didn\'t know if anyone would watch our yearlong investigation. Even worse, I didn\'t even know if they would care.',
        '<a href="http://www.cnn.com/2015/01/07/us/recreational-marijuana-laws/index.html" target="_blank">Is weed legal in your state?</a>',
        'Just two years later, in "Weed 3," we are eyewitnesses to a revolution in full swing. You will ride along with us for the dawn of the first federally approved clinical study on the use of marijuana for PTSD. You will meet patients such as Sean Kiernan, an accomplished investment banker, and Amelia Taylor, a stay-at-home mom.',
        'They are the remarkable and surprising faces of this revolution -- smart, successful and suffering -- unwilling to accept the fact that commonly prescribed medications often used to treat PTSD can be worse than the underlying disorder itself. Sean Kiernan nearly died, trying to get better.',
        'You will see what weed really does to your brain, in crystal clear images. This time around, you will hear from the heads of government agencies earnestly sharing their point of view, both Democratic and Republican senators, and even the President of the United States.',
        'This is what a revolution looks like.',
        '<a href="http://www.cnn.com/2015/04/16/health/sanjay-gupta-medical-marijuana-questions-answers/index.html" target="_blank">Your medical marijuana questions answered</a>',
        'When "Weed 2: Cannabis Madness" aired in March 2014, Boston researcher Rick Doblin believed the right people were watching. Just four days later, Doblin received a letter in the mail he had been waiting on for seven years that finally provided federal approval for his marijuana study. The federal farm where Doblin would have to obtain his marijuana is on the campus of Ole Miss in Oxford, Mississippi. In anticipation of a scientific revolution, the production of research-grade marijuana there has increased 30-fold in just the past year.',
        'Make no mistake, we have plenty of evidence that the approval and support of the federal government can fast track a revolution at a faster pace than we have yet seen.',
        'It was the National Institute of Allergy and Infectious Diseases that spearheaded the research into a cure for AIDS, as well as stopping the spread of West Nile Virus. They were also responsible for the awesome task of eradicating polio and smallpox. Other successful federally backed programs include the human genome project, the BRAIN initiative and the Precision Medicine Initiative. There are no shortage of examples where the federal government has been a guardian of our public health needs, and you could argue that medical marijuana would also qualify as a worthwhile investment.',
        '<a href="http://www.cnn.com/2015/04/15/health/marijuana-medical-advances/index.html">10 diseases where medical marijuana could have impact</a>',
        'There is now promising research into the use of marijuana that could impact tens of thousands of children and adults, including treatment for cancer, epilepsy and Alzheimer\'s, to name a few. With regard to pain alone, marijuana could greatly reduce the demand for narcotics and simultaneously decrease the number of accidental painkiller overdoses, which are the greatest cause of preventable death in this country.',
        'As I sat across from Sens. Kirsten Gillibrand (D-New York) and Cory Booker (D-New Jersey), I knew something extraordinary was happening.',
        'They were reciting the story of Charlotte Figi and countless other children. They were quoting back the data we had shared from our earlier investigations. They were extolling the potential virtues of the plant, and all of that was before the interview even started. There was an impatience about them, and they seemed in a hurry to make a large dent in marijuana reform.',
        'They want marijuana to be rescheduled. They want it now.',
        'They want doctors to be able to prescribe it at VA hospitals all over the country. They want it now.',
        'They want research dollars freed up to study the plant. They want it now.',
        'They want their fellow lawmakers at the state and national level to acknowledge what most of the world, including the citizens of the United States, have known for a long time: Marijuana is a medicine, that should be studied and treated like any other medicine.',
        'And they want all of it now.',
        'I spent much of our interview challenging them. I needed to remind them that people, long before me or them, have been trying to do many of these same things for 40 years, and had been rejected every time. I reminded them that politicians have a hard time winning elections on the issue of marijuana but less difficulty losing them. I challenged them every step of the way. "This time will be different," Booker confidently told me as he walked out of the room.',
        '<a href="http://www.cnn.com/2014/01/20/health/marijuana-versus-alcohol/index.html" target="_blank">Is marijuana as safe as -- or safer than -- alcohol?</a>',
        'I know how easy it is do nothing because I did nothing for too long. Take a good look at the data, educate yourself and talk to the patients, who are often out of options and find their hope in the form of a simple plant.',
        'Journalists shouldn\'t take a position. It makes sense. Objectivity is king. But, at some point, open questions do get answered. At some point, contentious issues do get resolved. At some point, common sense prevails.',
        'So, here it is: We should legalize medical marijuana. We should do it nationally. And, we should do it now.',
        '<a href="http://money.cnn.com/2015/04/13/news/pot-marijuana-facts/" target="_blank">9 things to know about legal pot</a>',
        '2. "Hillary Clinton as you know, as most people know, she\'s a world class liar."',
        '12. "Hillary Clinton as you know, as most people know, she\'s a world class liar."',
        '<ul><li>"Eclipsed"</li><li>"The Father"</li><li>*"The Humans"</li><li>"King Charles III"</li></ul>',
        '<ol><li>1. "I have this old fashioned idea that if you are running for president, you should say what you want to do."</li><li>2. "He calls himself the \'King of Debt.\' And his tax plan sure lives up to the name."</li></ol>',
        '123. "Hillary Clinton as you know, as most people know, she\'s a world class liar."',
        '124. "Hillary Clinton as you know, as most people know, she\'s a world class liar."',
        '1 presidential candidates speak out on gay marriage ruling',
        '12 presidential candidates speak out on gay marriage ruling',
        '123 presidential candidates speak out on gay marriage ruling',
        '1234 presidential candidates speak out on gay marriage ruling',
        '<del>Kristina Sivkova (4x100m)</del>'
    ];

paragraphs.forEach((paragraph) => {
    console.log(md.format(paragraph));
});
