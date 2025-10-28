import qbank1 from "./gre_qbank_1.json";
import qbank2 from "./gre_qbank_2.json";
import qbank3 from "./gre_qbank_3.json";
import qbank4 from "./gre_qbank_4.json";
import qbank5 from "./gre_qbank_5.json";

export type Question = {
  id: string;
  category: "verbal" | "quantitative" | "analytical";
  question: string;
  options: string[];
  answer: number; // index of correct answer
};

export type BankItem = {
  id: string;
  section: string;
  question: string;
  choices?: (string | number)[];
  correct_answer?: (string | number)[];
};

const normalizeBank = (bank: { items?: BankItem[] }): Question[] => {
  if (!bank?.items) return [];
  const items: BankItem[] = bank.items ?? [];
  return items
    .map((item) => {
      const section = item.section?.toLowerCase() || "";
      let category: "verbal" | "quantitative" | "analytical" | null = null;
      if (section.includes("verbal")) category = "verbal";
      else if (section.includes("quant")) category = "quantitative";
      else if (section.includes("analytical")) category = "analytical";
      if (!category) return null;

      const options =
        item.choices?.map((c: string | number) => String(c)) ?? [];
      const correct = item.correct_answer?.[0];
      const answerIndex = options.findIndex(
        (o: string) => o === String(correct),
      );

      return {
        id: item.id,
        category,
        question: item.question,
        options,
        answer: answerIndex >= 0 ? answerIndex : 0,
      } as Question;
    })
    .filter(Boolean);
};

export const questions: Question[] = [
  ...normalizeBank(qbank1),
  ...normalizeBank(qbank2),
  ...normalizeBank(qbank3),
  ...normalizeBank(qbank4),
  ...normalizeBank(qbank5),
];
