import axios from "axios";
import { type Note, type NewNote } from "@/types/note"


interface NotesHttpResponse {
    notes: Note[],
    totalPages: number
}

function ensureKey() {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!myKey) throw new Error("Auth token is missing. Please set NEXT_PUBLIC_NOTEHUB_TOKEN.");
  return myKey;
}

const url = `https://notehub-public.goit.study/api/notes`;

export async function fetchNotes(page: number, perPage: number, searchTerm: string):
    Promise<NotesHttpResponse> {
    const { data } = await axios.get<NotesHttpResponse>(url, {
        params: {
            page: page,
            perPage: perPage,
            search: searchTerm,
    }, 
    headers: {
        Authorization: `Bearer ${ensureKey()}`,
        Accept: 'application/json'
        }
    }) 
    
    return data
}

export async function deleteNote(id: string) {
    const res = await axios.delete<Note>(`${url}/${id}`, {
    headers: {
        Authorization: `Bearer ${ensureKey()}`,
        Accept: 'application/json'
        }
    })

    return res.data
}

export async function createNote(newNote: NewNote) {
    const res = await axios.post<Note>(`${url}`, newNote, {
    headers: {
        Authorization: `Bearer ${ensureKey()}`,
        Accept: 'application/json'
        }
    })

    return res.data
}

export async function fetchNotesById(id: string){
    const res = await axios.get<Note>(`${url}/${id}`, {
    headers: {
        Authorization: `Bearer ${ensureKey()}`,
        Accept: 'application/json'
        }
    })
    console.log(url, id)
    return res.data
}