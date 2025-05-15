<script lang="ts" setup>
import { computed, ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import type { ITask, TTaskFilter } from "./types";
import TaskList from "./components/TaskList.vue";
import ListFilterButton from "./components/ListFilterButton.vue";

const message = ref("Task App");
const tasks = ref<ITask[]>([]);
const filter = ref<TTaskFilter>("all")

const totalDone = computed(() =>
  tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0)
);

const filteredTasks = computed(() => {
  switch(filter.value) {
    case 'all':
      return tasks.value;
    case 'done':
      return tasks.value.filter(task => task.done);
    case 'todo':
      return tasks.value.filter(task => !task.done);
  }
  return tasks.value;
})

const addTask = (newTask: string) => {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: newTask,
    done: false,
  });
};

const toggleDone = (id: string) => {
  const task = tasks.value.find((task) => task.id === id);
  if (task) task.done = !task.done;
};

const removeTask = (id: string) => {
  const idx = tasks.value.findIndex((task) => task.id === id);
  if (idx !== -1) tasks.value.splice(idx, 1);
};

const setFilter = (value: TTaskFilter) => {
  filter.value = value
}

</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="addTask" />
    <h3 v-if="!tasks.length" class="text-tile">
      Add Your task to get started!
    </h3>
    <h3 v-else>{{ totalDone }} / {{ tasks.length }} tasks completed</h3>
    <div v-if="tasks.length" class="button-container">
      <ListFilterButton :currentFilter="filter" filter="all" @set-filter="setFilter"/>
      <ListFilterButton :currentFilter="filter" filter="todo" @set-filter="setFilter"/>
      <ListFilterButton :currentFilter="filter" filter="done" @set-filter="setFilter"/>
    </div>
    <!-- prop passing -->
    <TaskList :tasks="filteredTasks" @toggle-done="toggleDone" @remove-task="removeTask" />
  </main>
</template>

<style>
main {
  max-width: 800px;
  margin: 1rem auto;
}
.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem
}
.text-tile {
  text-align: center;
}
</style>
