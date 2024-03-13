import { ref } from "vue";
import { createGlobalState } from '@vueuse/core';
export const useGetTreeItem = createGlobalState(
    () => {
        const items = ref({});
        function setItems(e) {
           items.value = e
        }
        function getItems() {
           return items.value
        }
        return {
            setItems,
            getItems
        }
    }
)