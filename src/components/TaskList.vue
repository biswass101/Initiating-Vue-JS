<script lang="ts" setup>
import type { ITask } from "../types";

const props = defineProps<{
  tasks: ITask[];
}>();


const emits = defineEmits<{
    toggleDone: [id: string]
    removeTask: [id: string]
}>();

</script>

<template>
  <TransitionGroup name="list" tag="div" class="task-list">
    <article v-for="task in props.tasks" class="task" :key="task.id">
      <label>
        <input @input="emits('toggleDone', task.id)"  :checked="task.done" type="checkbox">
        <span :class="{ done: task.done }">{{ task.title }}</span>
      </label>
      <button class="outline" @click="emits('removeTask', task.id)">Remove</button>
    </article>
  </TransitionGroup>
</template>

<style>
.task-list {
  margin-top: 1rem;
}

.done {
    text-decoration: line-through;
}

.task {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translate(300px);
}
</style>
