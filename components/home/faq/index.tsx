'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import {pageData} from "@/utils/data";

const {faqList} = pageData;

function Faq() {
  return (
    <section>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col gap-10 md:gap-20'>
            <div className='max-w-md text-center mx-auto'>
              <h2>
                <TextGenerateEffect words="Got questions? We’ve got" className='text-5xl' />
                <TextGenerateEffect
                  words="answers"
                  delay={1}
                  className="italic text-5xl font-normal instrument-font"
                />
              </h2>
            </div>
            <div className='flex flex-col'>
              <Accordion
                type='single'
                collapsible
                className='flex flex-col gap-4'>
                {faqList?.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className='px-6 py-2 border group rounded-2xl text-muted-foreground'>
                    <AccordionTrigger className='group-hover:cursor-pointer'>
                      <h4 className='text-xl'>
                        {item.faq_que}
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className='text-base font-normal '>
                        {item.faq_ans}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
