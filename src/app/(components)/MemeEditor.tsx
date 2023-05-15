'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dictionary, MemeTemplate } from '../(data)/types';
import MemeDisplay from './MemeDisplay';

interface Props {
  templates: MemeTemplate[];
}

const validationSchema = z.object({
  template: z.string().nonempty(),
  values: z.record(z.string(), z.string()),
});

interface FormValues {
  template: string;
  values: Dictionary<string>;
}

const textValues = (template: MemeTemplate) => {
  return template.textBlocks.reduce(
    (values, block) => ({
      ...values,
      [block.id]: block.text,
    }),
    {} as Dictionary<string>,
  );
};

const MemeEditor = ({ templates }: Props) => {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      template: templates[0].id,
      values: textValues(templates[0]),
    },
  });

  const templateId = watch('template');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const template = templates && templates.find(temp => temp.id === templateId)!;

  const values = watch('values');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: {
    template: string;
    values: Dictionary<string>;
  }) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/memes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template: data.template,
        values: data.values,
      }),
    });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid xs:grid-cols-1 md:grid-cols-[60%_40%]">
        <MemeDisplay {...template} values={values} />
        <div className="pl-2 text-white">
          <select
            className="select select-bordered w-full"
            value={templateId}
            onChange={e => {
              const newTemplate = templates.find(
                temp => temp.id === e.target.value,
              );
              setValue('template', newTemplate?.id as string);
              setValue('values', textValues(newTemplate as MemeTemplate));
            }}
          >
            <option disabled>Pick your template</option>
            {templates &&
              templates.map(temp => (
                <option key={temp.id} value={temp.id}>
                  {temp.id}
                </option>
              ))}
          </select>
          {template.textBlocks.map((textBlock, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${textBlock.id}-${index}`} className="mt-5">
              <label htmlFor={textBlock.id}>{textBlock.id}</label>
              <div>
                <input
                  className="input w-full input-bordered"
                  type="text"
                  {...register(`values.${textBlock.id}`)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="btn btn-accent mt-5 min-w-[200px]"
              type="submit"
              disabled={isPending}
            >
              Let&apos;s go!
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MemeEditor;
