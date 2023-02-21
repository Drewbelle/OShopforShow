<template>
    <button class="ButtonFile">
        <slot></slot>
    </button>
</template>

<script>
    export default {
    name: 'ButtonFile',
    data() {
        return {}
    },
}
</script>

<style>
    .ButtonFile {
        position: relative;
        background-color: whitesmoke;
        color: rgb(0, 0, 0);
        width: 75px;
        height: 25px;
        line-height: 25px;
        font-size: 10px;
        border: 0px;
        text-align: center;
        transition-property: all;
        transition: 1s;
        text-decoration: none;
        cursor: pointer;
        box-shadow: 1px 1px 3px 0 black;
    }
    .ButtonFile:hover {
        background-color: rgba(130, 125, 209);
        box-shadow: 0px 0px 5px 0 black;
        color: black
    }
    @media (max-width: 1439px) {
    .ButtonFile{
        width: 50px;
        height: 16px;
        line-height: 16px;
        font-size: 8px;
    }
    }
        </style>