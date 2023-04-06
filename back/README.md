First run use [npm i]
run server [npm run dev]
## API Document

**API Endpoint:** localhost:8080

| Method | Path                | Description                | Body                           | Response |
|--------|---------------------|----------------------------|--------------------------------|----------|
| GET    | /persons         | Get all persons         | None                           | 200 : { persons: [ ] }<br/>500 : { message: "" } |
| GET    | /requests       | Get all requests       | None                           | 200 : { requests: [ ] }<br/>500 : { message: "" } |
| GET    | /requests/:id   | Get request by id      | None                           | 200 : { request: { } }<br/>500 : { message: "" } |
| POST   | /requests       | Create request         | {<br/>&nbsp;&nbsp;&nbsp; topic: required string,<br/>&nbsp;&nbsp;&nbsp; date: required date-string,<br/>&nbsp;&nbsp;&nbsp; personId: required<br/>} | 201 : { request: { } }<br/>400 : { message: "" }<br/>500 : { message: "" } |
| PUT    | /requests/:id   | Update request by id   | {<br/>&nbsp;&nbsp;&nbsp; topic: required string,<br/>&nbsp;&nbsp;&nbsp; date: required date-string,<br/>&nbsp;&nbsp;&nbsp; personId: required<br/>} | 200 : { transaction: { } }<br/>400 : { message: "" }<br/>500 : { message: "" } |
| DELETE | /requests/:id   | Delete request by id   | None                           | 204 : No Content<br/>400 : { message: "" }<br/>500 : { message: "" } |
