"use client";

import { fetchNotesById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "@/app/notes/[id]/NoteDetails.module.css"

export default function NoteDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
      queryKey: ['Note', { id: id }],
      queryFn: () => fetchNotesById(id as string),
    refetchOnMount: false,
  });

    return (
    <div>
            {isLoading && <p>Loading, please wait...</p>}
            {isError && <p>Something went wrong.</p>}
            {data?.id && <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data?.title}</h2>
                    </div>
                    <p className={css.content}>{data?.content}</p>
                    <p className={css.date}>{data?.createdAt}</p>
                </div>
            </div>}
        </div>
  );
}