# Documentation style (domain modules)

Use this skeleton for [`modules-asb.md`](./modules-asb.md), [`modules-jalan.md`](./modules-jalan.md), and [`modules-saluran.md`](./modules-saluran.md):

1. `#` Title
2. **Overview** — purpose and boundaries (Jalan vs Saluran: one sentence each)
3. **Architecture** — mapping to `domain` / `application` / `infrastructure` / `presentation`
4. **Key entities** — table: entity | responsibility | relationships
5. **HTTP surface** — route prefixes and main operations; Postman collection names under [`postman/`](../postman/) when relevant
6. **Flows** — numbered steps or mermaid where helpful
7. **Shared logic** — *Jalan and Saluran only*: bullets linking to shared use cases and the sibling doc
8. **Dependencies** — other Nest modules or external concerns
9. **Related code paths** — primary folders under `src/`

[`module-catalog.md`](./module-catalog.md) rows use: **Module** | **HTTP prefix** (or `—` if no controller) | **Domain folder** | **In AppModule** | **Parent / composed by** | **Business module** | **Notes**
