import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "@/static/faq.json";

const Faq = () => {
  return (
    <>
      <h2 className="text-2xl font-bold py-4 ">FAQS</h2>
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq: any, index: number) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Faq;
