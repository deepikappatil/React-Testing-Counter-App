import React from 'react'
import Counter from '../Counter'
import {render, fireEvent, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

let getByTestId;

//runs before each func/test
beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;
})

//runs after each func/test
afterEach(() => {
    //cleans up all of the DOM in our React tree
    cleanup();
})

test("Counter Component renders currectly", () => {
    render(<Counter />)
})

test("header renders with currect text", () => {
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("My Counter");
})

test("counter initially start with text of 0", () => {
    const counterEl = getByTestId("counter");

    expect(counterEl.textContent).toBe("0");
})

test("input contains intial value of 1", () => {
    const inputEl = getByTestId("input");

    expect(inputEl.value).toBe("1");
})

test("add button renders with +", () => {
    const addBtn = getByTestId("add-btn");

    expect(addBtn.textContent).toBe("+");
})

test("subtract button renders with -", () => {
    const subtractBtn = getByTestId("subtract-btn");

    expect(subtractBtn.textContent).toBe("-");
})

test("changing value of input works currectly", () => {
    const inputEl = getByTestId("input");

    expect(inputEl.value).toBe("1");

    // chnage the target value
    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    expect(inputEl.value).toBe("5");
})

test("clicking on + button adds 1 to counter", () => {
    const addBtn = getByTestId("add-btn");
    const counterEl = getByTestId("counter");

    expect(counterEl.textContent).toBe("0");

    fireEvent.click(addBtn);

    expect(counterEl.textContent).toBe("1");
})

test("clicking on - button subtracts 1 from counter", () => {
    const subtractBtn = getByTestId("subtract-btn");
    const counterEl = getByTestId("counter");

    expect(counterEl.textContent).toBe("0");

    fireEvent.click(subtractBtn);

    expect(counterEl.textContent).toBe("-1");
})

test("changing input value then clicking on + button works currectly", () => {
    const addBtn = getByTestId("add-btn");
    const counterEl = getByTestId("counter");
    const inputEl = getByTestId("input");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })
    fireEvent.click(addBtn);

    expect(counterEl.textContent).toBe("5");
})

test("changing input value then clicking on - button works currectly", () => {

    const subtractBtn = getByTestId("subtract-btn");
    const counterEl = getByTestId("counter");
    const inputEl = getByTestId("input");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })
    fireEvent.click(subtractBtn);

    expect(counterEl.textContent).toBe("-5");
})

test("adding & then subtracting leads to the current counter value", () => {
    const subtractBtn = getByTestId("subtract-btn");
    const addBtn = getByTestId("add-btn");
    const counterEl = getByTestId("counter");
    const inputEl = getByTestId("input");

    fireEvent.change(inputEl, {
        target: {
            value: "10"
        }
    })

    //click on + button 4 times
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);

    //click on - button 2 times
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);

    //Counter value should be 20
    expect(counterEl.textContent).toBe("20");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    fireEvent.click(addBtn);
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);

    expect(counterEl.textContent).toBe("15");
})

test("counter contains correct className", () => {
    const counterEl = getByTestId("counter");
    const inputEl = getByTestId("input");
    const subtractBtn = getByTestId("subtract-btn");
    const addBtn = getByTestId("add-btn");
  
    expect(counterEl.className).toBe(" ");

    fireEvent.change(inputEl, {
        target: {
            value: "50"
        }
    })

    fireEvent.click(addBtn);

    expect(counterEl).not.toHaveClass();

    fireEvent.click(addBtn);

    expect(counterEl).toHaveClass("green");

    fireEvent.click(addBtn);

    expect(counterEl).toHaveClass("green");

    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);

    expect(counterEl).not.toHaveClass();

    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    fireEvent.click(subtractBtn);
    
    expect(counterEl).toHaveClass("red");
})