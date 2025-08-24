import { fetchNotes } from "@/lib/api"
import NotesPage from "./Notes.client"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


export default async function Notes() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['Note', {currentPage: 1, searchQuery: ''}],
        queryFn: () => fetchNotes(1, 12, ""),
    })

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotesPage />
             </HydrationBoundary>
        </div>
    )
}