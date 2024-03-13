import { useEffect, useState } from "react";

export const useEventData = () => {
  const [data, setData] = useState({
    users: [],
    events: [],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:3000/users");
        const eventsResponse = await fetch("http://localhost:3000/events");
        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );

        const users = await usersResponse.json();
        const events = await eventsResponse.json();
        const categories = await categoriesResponse.json();

        // Check if any array is empty
        if (users.length > 0 && events.length > 0 && categories.length > 0) {
          setData({ users, events, categories });
        } else {
          console.error("Error: Empty data received");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export const useEvent = (eventId) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return event;
};

export const useCategory = (categoryId) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/categories/${categoryId}`
        );
        const categoryData = await response.json();
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  return category;
};
