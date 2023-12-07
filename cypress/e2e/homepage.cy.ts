describe("Homepage check", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("homepage exists with h1 title", () => {
    cy.get("h1").contains("All the dev jobs, one place");
  });

  it("Saved Searches button exists and points to profile", () => {
    cy.get("a").eq(1).contains("Saved Searches").click();
    cy.location("pathname").should("equal", "/profile");
  });

  it("Liked Jobs button exists and points to profile", () => {
    cy.get("a").eq(2).contains("Liked Jobs").click();
    cy.location("pathname").should("equal", "/profile");
  });

  it("Applied Jobs button exists and points to profile", () => {
    cy.get("a").eq(3).contains("Applied Jobs").click();
    cy.location("pathname").should("equal", "/profile");
  });
  
});
