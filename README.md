Requirements:

1. Create a service to fetch submission data from pushshift api from any subreddit you like
2. Create a react app that uses the pushshift service you built and display a list of reddit submissions
3. Use Material UI and be sure to make your components modular and easy to read and maintainable for the future (an entire application written in one page will not be accepted)_bonus_
4. Spin up a database of your choice (postgresql would be a plus if you know it)
5. Create 1 table (submission) don't need to store all the data just get id, upvotes/downvotes and the link or text from the post
6. Fill up the database with data from the api
7. Allow a user to create a favorite list with the data you have collected
8. Once done, please upload it on github.

Notes:

- Please use the `/api/scrape` endpoint to test #1. Required query params: `subreddit`. Optional query params: `size`. Other parameters are not exposed.

Framework:

- NextJS (Hosted on Vercel)

Database:

- PostgreSQL

3rd party utilities used:

- react-query (for query state management and caching)
- axios (for data fetching & automatic JSON serialization)
- moment (for timestamp formatting in UI)
- lodash (for convenience functions)

Assumptions

- No UI/UX provided. Base MaterialUI components are used. No theme overrides
- Pagination is not implemented as this should be implemented in the backend. Do let me know if this is part of the requirement.
- No user authentication needed - data is shared among all users using the app
- Service/DAO layer skipped, all logic implemented inside controllers considering the small scope
- Single commit message at the start is intentional due to the small scope. Separate commit messages can be requested should it be needed

- On live app, due to current postgresql constraints, scraper might run a bit slow since we're only using 1 connection due to the limit imposed by the free postgresql server
