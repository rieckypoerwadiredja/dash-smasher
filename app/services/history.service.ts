import { getBooks } from "./books.service";
import { getCourt } from "./court.service";
import { getEvent } from "./event.service";
import { getEventMember } from "./eventMember.service";

export async function getHistory(email?: string, limit?: string) {
  try {
    if (!email) {
      return {
        success: false,
        status: 400,
        message: "Email query parameter is required",
        data: null,
      };
    }

    let parsedLimit: number | undefined = undefined;

    if (limit !== undefined) {
      if (limit === "all") {
        parsedLimit = undefined; // no limit
      } else {
        parsedLimit = parseInt(limit, 10);

        if (isNaN(parsedLimit)) {
          return {
            success: false,
            status: 400,
            message: "Limit must be a valid number or 'all'",
            data: null,
          };
        }
      }
    }

    const myBook = await getBooks(email);
    const myEvent = await getEventMember(email);

    if (!myBook.data || !myEvent.data) {
      throw new Error("no have book and event data");
    }

    const limitedBooks =
      parsedLimit !== undefined
        ? myBook.data.slice(0, parsedLimit)
        : myBook.data;

    const booksWithCourt = await Promise.all(
      limitedBooks.map(async (book) => {
        const court = await getCourt(book.court_id);

        return {
          ...book,
          name: court.data?.name || "",
          image: court.data?.image || "",
        };
      })
    );

    const limitedEvents =
      parsedLimit !== undefined
        ? myEvent.data.slice(0, parsedLimit)
        : myEvent.data;

    const booksWithEvent = await Promise.all(
      limitedEvents.map(async (myEvent) => {
        const event = await getEvent(myEvent.event_id);

        return {
          ...myEvent,
          name: event.data?.name || "",
          image: event.data?.image || "",
          desc: "Registered",
        };
      })
    );

    return {
      success: true,
      status: 200,
      message: "Success",
      data: {
        books: booksWithCourt,
        events: booksWithEvent,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
}
