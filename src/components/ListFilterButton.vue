<script setup lang="ts">
import type { TTaskFilter } from '../types';

const props = defineProps<{
    filter: TTaskFilter;
    currentFilter: TTaskFilter
}>();

const emits = defineEmits<{
    setFilter: [filter: TTaskFilter]
}>()

</script>

<template>
    <button 
        class="secondary" 
        @click="emits('setFilter', props.filter)"
        :class="{
            contrast: props.currentFilter === props.filter
        }"
    > 
        {{ props.filter }}
    </button>
</template>

<style scoped>
button {
    text-transform: capitalize;
}
</style>