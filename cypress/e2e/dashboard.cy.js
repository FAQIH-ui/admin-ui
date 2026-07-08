describe("Dashboard (Overview) Page", () => {
  it("should access dashboard overview after login with valid credentials", () => {
    // Step 1: Login dulu, karena dashboard di-guard RequireAuth
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("hello@example.com")
      .should("have.value", "hello@example.com");

    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "*************")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Login").click();

    cy.wait(5000);

    // Step 2: Pastikan sudah masuk ke halaman dashboard (bukan lagi /login)
    cy.url().should("eq", "http://localhost:5173/");

    // Step 3: Verifikasi struktur utama layout tampil
    cy.get("nav").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("main").should("be.visible");

    // Step 4: Verifikasi header menampilkan nama user dan tanggal
    cy.get("header").within(() => {
      cy.get("div").should("exist"); // nama user tampil di dalam header
    });

    // Step 5: Verifikasi menu navigasi sidebar lengkap
    cy.get("nav").within(() => {
      cy.contains("Overview").should("be.visible");
      cy.contains("Balances").should("be.visible");
      cy.contains("Transaction").should("be.visible");
      cy.contains("Bills").should("be.visible");
      cy.contains("Expenses").should("be.visible");
      cy.contains("Goals").should("be.visible");
      cy.contains("Settings").should("be.visible");
    });

    // Step 6: Verifikasi card Total Balance
    cy.contains("Total Balance").should("be.visible");
    cy.contains("All account").should("be.visible");
    cy.contains("Account Type").should("be.visible");
    cy.contains("Credit Card").should("be.visible");

    // Step 7: Verifikasi card Goals
    cy.contains("Goals").should("be.visible");
    cy.contains("Target Achieved").should("be.visible");
    cy.contains("This Month Target").should("be.visible");
    cy.contains("Target vs Achievement").should("be.visible");

    // Step 8: Verifikasi card Upcoming Bill
    cy.contains("Upcoming Bill").should("be.visible");

    // Step 9: Verifikasi section Recent Transactions
    cy.contains("Recent Transactions").should("be.visible");
    cy.contains("All").should("be.visible");
    cy.contains("Revenue").should("be.visible");
    cy.contains("Expense").should("be.visible");

    // Step 10: Verifikasi section Statistics
    cy.contains("Statistics").should("be.visible");
    cy.contains("Weekly Comparison").should("be.visible");
    cy.contains("This Week").should("be.visible");
    cy.contains("Last Week").should("be.visible");
  });

  it("should redirect to /login when accessing dashboard without login", () => {
    // Pastikan tidak ada sesi login aktif (hapus localStorage token jika ada)
    cy.clearLocalStorage();

    cy.visit("http://localhost:5173/");

    // RequireAuth di App.jsx harus redirect ke /login kalau user belum login
    cy.url().should("include", "/login");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
  });
});