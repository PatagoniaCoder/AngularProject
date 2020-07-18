import { TestBed } from "@angular/core/testing";

import { CustomerService } from "./customer.service";

describe("CustomerService", () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
