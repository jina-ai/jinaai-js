
<template>
    <div>
        <h1>JinaAI</h1>
        <p>{{ result ? result : 'loading...' }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import JinaAi from '../../../../src/jinaai'

const result = ref<null | string>();

onMounted(async () => {
    const jinaai = new JinaAi({
        secrets: {
            'jinachat-secret': '8C1h2IegXNKy5m1wN3i2:4547e8ef006bdd2a4893bbc0e30c1c2dfc98de67b64e29e54cfa20c2f09d1b9e'
        }
    })
    const r = await jinaai.generate('Write a welcome message for a company name JinaAI')
    result.value = r.output
});

</script>
