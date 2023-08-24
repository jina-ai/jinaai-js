
<template>
    <div>
        <h1>JinaAI</h1>
        <p>{{ result ? result : 'loading...' }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import JinaAi from 'jinaai'

const result = ref<null | string>();

onMounted(async () => {
    const jinaai = new JinaAi({
        secrets: {
            'jinachat-secret': 'your-api-secret'
        }
    })
    try {
        const r = await jinaai.generate('Write a welcome message for a company name JinaAI')
        result.value = r.output
    } catch (e: any) {
        result.value = JSON.stringify(e)
    }

});

</script>
