## API Document

**API Endpoint:** localhost:8080

| Method | Path                | Description                | Body                           | Response |
|--------|---------------------|----------------------------|--------------------------------|----------|
| GET    | /categories         | Get all categories         | None                           | 200 : { categories: [ ] }<br/>500 : { message: "" } |
| GET    | /transactions       | Get all transactions       | None                           | 200 : { transactions: [ ] }<br/>500 : { message: "" } |
| GET    | /transactions/:id   | Get transaction by id      | None                           | 200 : { transaction: { } }<br/>500 : { message: "" } |
| POST   | /transactions       | Create transaction         | {<br/>&nbsp;&nbsp;&nbsp; payee: required string,<br/>&nbsp;&nbsp;&nbsp; amount: required number,<br/>&nbsp;&nbsp;&nbsp; date: required date-string,<br/>&nbsp;&nbsp;&nbsp; comment: ,<br/>&nbsp;&nbsp;&nbsp; categoryId: required<br/>} | 201 : { transaction: { } }<br/>400 : { message: "" }<br/>500 : { message: "" } |
| PUT    | /transactions/:id   | Update transaction by id   | {<br/>&nbsp;&nbsp;&nbsp; payee: required string,<br/>&nbsp;&nbsp;&nbsp; amount: required number,<br/>&nbsp;&nbsp;&nbsp; date: required date-string,<br/>&nbsp;&nbsp;&nbsp; comment: ,<br/>&nbsp;&nbsp;&nbsp; categoryId: required<br/>} | 200 : { transaction: { } }<br/>400 : { message: "" }<br/>500 : { message: "" } |
| DELETE | /transactions/:id   | Delete transaction by id   | None                           | 204 : No Content<br/>400 : { message: "" }<br/>500 : { message: "" } |
