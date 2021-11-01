import reducer, {
  addTask,
  updateTask,
  updateChecked,
  removeTask,
  removeAllFromList,
  moveAllTasksOnListToAll,
  removeChecked,
  updateActiveCatagory,
  addCatagory,
  editCatagory,
  deleteCatagory,
  reloadState,
} from "../TasksSlice";

describe("tasks slice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the intial state", () => {
    expect(reducer(undefined, {})).toEqual({
      tasks: [],
      uniqueTaskId: 0,
      selectedCatagory: { name: "All", id: 0, editable: false },
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
      catagoryCount: 3,
    });
  });

  it("should handle todo being added to an empty list", () => {
    const previousState: any = { tasks: [], uniqueTaskId: 0 };
    expect(
      reducer(
        previousState,
        addTask({
          name: "theName",
          list: { name: "All", id: 0, editable: false },
        })
      )
    ).toEqual({
      tasks: [
        {
          id: 1,
          checked: false,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
      uniqueTaskId: 1,
    });
  });

  it("should handle a todo being added to an existing list", () => {
    const previousState: any = {
      uniqueTaskId: 1,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
    };
    expect(
      reducer(
        previousState,
        addTask({
          name: "anotherName",
          list: { name: "All", id: 0, editable: false },
        })
      )
    ).toEqual({
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 2,
          list: { editable: false, id: 0, name: "All" },
          name: "anotherName",
        },
      ],
      uniqueTaskId: 2,
    });
  });

  it("should not add the list if the task name is empty", () => {
    const previousState: any = { tasks: [], uniqueTaskId: 0 };
    expect(
      reducer(
        previousState,
        addTask({
          name: "",
          onCatagory: { name: "All", id: 0, editable: false },
        })
      )
    ).toEqual({
      tasks: [],
      uniqueTaskId: 0,
    });
  });

  it("should not add the list if the task name is more than 90 chars", () => {
    const previousState: any = { tasks: [], uniqueTaskId: 0 };
    expect(
      reducer(
        previousState,
        addTask({
          name: "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ",
          onCatagory: { name: "All", id: 0, editable: false },
        })
      )
    ).toEqual({
      tasks: [],
      uniqueTaskId: 0,
    });
  });

  it("should update a task", () => {
    const previousState: any = {
      uniqueTaskId: 1,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
    };
    expect(
      reducer(
        previousState,
        updateTask({
          checked: true,
          id: 1,
          list: { editable: true, id: 1, name: "Personal" },
          name: "newName",
        })
      )
    ).toEqual({
      tasks: [
        {
          checked: true,
          id: 1,
          list: { editable: true, id: 1, name: "Personal" },
          name: "newName",
        },
      ],
      uniqueTaskId: 1,
    });
  });

  it("should update checked", () => {
    const previousState: any = {
      uniqueTaskId: 1,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
    };

    expect(
      reducer(
        previousState,
        updateChecked({
          id: 1,
          checked: true,
        })
      )
    ).toEqual({
      uniqueTaskId: 1,
      tasks: [
        {
          checked: true,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
    });
  });

  it("should remove task", () => {
    const previousState: any = {
      uniqueTaskId: 1,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
    };

    expect(
      reducer(
        previousState,
        removeTask({
          id: 1,
        })
      )
    ).toEqual({
      uniqueTaskId: 1,
      tasks: [],
    });
  });

  it("should remove all tasks on the catagory", () => {
    const previousState: any = {
      uniqueTaskId: 5,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 2,
          list: { editable: false, id: 1, name: "Personal" },
          name: "theName",
        },
        {
          checked: false,
          id: 3,
          list: { editable: false, id: 1, name: "Personal" },
          name: "anotherName",
        },
        {
          checked: false,
          id: 4,
          list: { editable: false, id: 2, name: "Professional" },
          name: "anotherName",
        },
      ],
    };

    expect(reducer(previousState, removeAllFromList(1))).toEqual({
      uniqueTaskId: 5,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 4,
          list: { editable: false, id: 2, name: "Professional" },
          name: "anotherName",
        },
      ],
    });
  });
  it("should move the tasks to all", () => {
    const previousState: any = {
      uniqueTaskId: 5,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 2,
          list: { editable: false, id: 1, name: "Personal" },
          name: "theName",
        },
        {
          checked: false,
          id: 3,
          list: { editable: false, id: 1, name: "Personal" },
          name: "anotherName",
        },
        {
          checked: false,
          id: 4,
          list: { editable: false, id: 2, name: "Professional" },
          name: "anotherName",
        },
      ],
    };

    expect(reducer(previousState, moveAllTasksOnListToAll({ id: 1 }))).toEqual({
      uniqueTaskId: 5,
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 2,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 3,
          list: { editable: false, id: 0, name: "All" },
          name: "anotherName",
        },
        {
          checked: false,
          id: 4,
          list: { editable: false, id: 2, name: "Professional" },
          name: "anotherName",
        },
      ],
    });
  });

  it("should remove all the tasks that are checked", () => {
    const previousState: any = {
      uniqueTaskId: 5,
      tasks: [
        {
          checked: true,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
        {
          checked: false,
          id: 2,
          list: { editable: false, id: 1, name: "Personal" },
          name: "theName",
        },
        {
          checked: true,
          id: 3,
          list: { editable: false, id: 1, name: "Personal" },
          name: "anotherName",
        },
        {
          checked: false,
          id: 4,
          list: { editable: false, id: 2, name: "Professional" },
          name: "anotherName",
        },
      ],
    };

    expect(reducer(previousState, removeChecked({ id: 1 }))).toEqual({
      uniqueTaskId: 5,
      tasks: [
        {
          checked: false,
          id: 2,
          list: { editable: false, id: 1, name: "Personal" },
          name: "theName",
        },
        {
          checked: false,
          id: 4,
          list: { editable: false, id: 2, name: "Professional" },
          name: "anotherName",
        },
      ],
    });
  });

  it("updates the active catagory", () => {
    const previousState: any = {
      selectedCatagory: { name: "All", id: 0, editable: false },
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    };

    expect(
      reducer(
        previousState,
        updateActiveCatagory({ editable: true, id: 2, name: "Professional" })
      )
    ).toEqual({
      selectedCatagory: { editable: true, id: 2, name: "Professional" },
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    });
  });

  it("doesn't update anything up if inactive catagory updated", () => {
    const previousState: any = {
      selectedCatagory: { name: "All", id: 0, editable: false },
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    };

    expect(
      reducer(
        previousState,
        updateActiveCatagory({ editable: true, id: 3, name: "Doesn't exist" })
      )
    ).toEqual(previousState);
  });

  it("adds a catagory ", () => {
    const previousState: any = {
      catagoryCount: 3,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    };

    expect(reducer(previousState, addCatagory("Custom"))).toEqual({
      catagoryCount: 4,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
        { name: "Custom", id: 3, editable: true },
      ],
    });
  });

  it("Does not add a 16th and over catagory ", () => {
    const previousState: any = {
      catagoryCount: 17,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
        { name: "Another", id: 3, editable: true },
        { name: "Another", id: 4, editable: true },
        { name: "Another", id: 5, editable: true },
        { name: "Another", id: 6, editable: true },
        { name: "Another", id: 7, editable: true },
        { name: "Another", id: 8, editable: true },
        { name: "Another", id: 9, editable: true },
        { name: "Another", id: 10, editable: true },
        { name: "Another", id: 11, editable: true },
        { name: "Another", id: 12, editable: true },
        { name: "Another", id: 13, editable: true },
        { name: "Another", id: 14, editable: true },
        { name: "Another", id: 15, editable: true },
        { name: "Another", id: 16, editable: true },
      ],
    };

    expect(reducer(previousState, addCatagory("OneToMany"))).toEqual(
      previousState
    );
  });

  it("edits a catagory", () => {
    const previousState: any = {
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    };

    expect(
      reducer(previousState, editCatagory({ id: 1, name: "newName" }))
    ).toEqual({
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "newName", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    });
  });

  it("will not edit a catagory that is not editable", () => {
    const previousState: any = {
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    };

    expect(
      reducer(previousState, editCatagory({ id: 0, name: "newName" }))
    ).toEqual(previousState);
  });

  //todo fix catagory count, shouldn't be used to make a list have an ID
  it("deletes a catagory", () => {
    const previousState: any = {
      catagoryCount: 3,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
    };
    expect(reducer(previousState, deleteCatagory({ id: 1 }))).toEqual({
      catagoryCount: 2,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Professional", id: 2, editable: true },
      ],
    });
  });

  it("reloads the state", () => {
    const previousState: any = {
      tasks: [
        {
          checked: false,
          id: 1,
          list: { editable: false, id: 0, name: "All" },
          name: "theName",
        },
      ],
      catagoryCount: 3,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
      selectedCatagory: { name: "Personal", id: 1, editable: true },
    };

    /*state.tasks = action.payload.tasks;
    state.catagory = action.payload.catagory;
    state.catagoryCount = action.payload.catagoryCount;
    state.selectedCatagory = { id: 0, name: "All", editable: false };*/

    const reloadedState: any = {
      tasks: [
        {
          checked: false,
          id: 2,
          list: { editable: true, id: 1, name: "Personal" },
          name: "completely different",
        },
      ],
      catagoryCount: 2,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
      ],
      selectedCatagory: { name: "Personal", id: 1, editable: true },
    };

    expect(reducer(previousState, reloadState(reloadedState))).toEqual({
      tasks: [
        {
          checked: false,
          id: 2,
          list: { editable: true, id: 1, name: "Personal" },
          name: "completely different",
        },
      ],
      catagoryCount: 2,
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
      ],
      selectedCatagory: { name: "All", id: 0, editable: false },
    });
  });
});
