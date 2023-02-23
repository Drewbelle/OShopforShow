<template>
    <div class="SelectFile" @click="goToCatalogAndSearchSelectedItem()">  {{ selectItem_data.name }}  </div>
</template>

<script>
    export default {
    name: 'SelectFile',
    props: { //пропсы - входные параметры от родительского компонента
            selectItem_data:{
                type: Object,
                default() {
                    return {}
                }
            },
    },
    data() {
        return {
        }
    },
    methods: {
        goToCatalogAndSearchSelectedItem() {
            this.$emit('goToCatalogAndSearchSelectedItem', this.selectItem_data)
        }
    }
}
</script>

<style lang="scss">
</style>