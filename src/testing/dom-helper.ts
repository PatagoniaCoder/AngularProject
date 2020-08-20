import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }
  singleText(tagName: string): string {
    const element: HTMLDivElement = this.fixture.debugElement.query(
      By.css(tagName)
    ).nativeElement;
    return element.textContent;
  }
  count(tagName: string): number {
    const elements = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.length;
  }
  countText(tagName: string, text: string): number {
    const elements = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.filter(
      (element) => element.nativeElement.textContent === text
    ).length;
  }
  getNativeElements(tagName: string, text: string): DebugElement {
    const linkDest = this.fixture.debugElement.queryAll(By.css(tagName));
    return linkDest.find(
      (element) => element.nativeElement.textContent === text
    );
  }
  clickButton(buttonText: string) {
    this.findAll("button").forEach((button) => {
      const buttonElement: HTMLButtonElement = button.nativeElement;
      if (buttonElement.textContent === buttonText) {
        buttonElement.click();
      }
    });
  }
  clickMatButton(buttonText: string, matTag: string) {
    this.findAll(matTag).forEach((button) => {
      const buttonElement: HTMLButtonElement = button.nativeNode;
      if (buttonElement.innerText === buttonText) {
        buttonElement.click();
      }
    });
  }
  findAllWithText(tagName: string, text: string) {
    return this.findAll(tagName).filter(
      (element) => element.nativeNode.innerText === text
    );
  }
  findAll(tagName: string) {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }
  findAllSelectors(tagName: string) {
    return this.fixture.nativeElement.querySelectorAll(tagName);
  }
}
