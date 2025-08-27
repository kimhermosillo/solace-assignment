### Discussion

If I had more time, I would have liked to implement:

- Clickable rows so that a modal pops up with more details on the advocate selected.

- Adding light mode/dark mode functionality to the overall theme.

- Adding functionality to make each column sortable (asc/desc).

- I would have liked to add more styling overall especially with the table.

- Mobile responsiveness.

- Dropdown for degree filters.

- Range slider for years of experience.

- Inline skeleton loaders.

- Persisting query parameters incase page gets refreshed.

- Accesible focus states.

- Of course.. unit tests.

These aren’t critical for a 2 hour take home but would significantly elevate patient experience.

As far as BE perf:

- Add support for sorting by years of experience, city, or last name (?sort=yearsOfExperience&dir=asc).

- Query params for degree, city, specialty, and experience range (?city=Denver&minYears=5).

- Performance testing.

- Return structured API errors, validate query params, and handle bad inputs gracefully.
