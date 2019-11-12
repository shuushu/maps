<template>
    <v-layout v-else class="nodata" text-xs-center pt-5 pb-5>
        <v-flex xs12>
            <v-icon @click="onClick" class="ico">mdi-close-circle-outline</v-icon>
            <div class="text">{{ msg }}</div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
	name: 'Nodata',
	props: {
		msg: {
		    type: String,
            default: 'No-data',
        },
	},
    methods: {
        onClick() {
            this.$emit('click', ['shushu', 'daeun']);
        },
    },
}
</script>

<style lang="scss" scoped>
.nodata{
    font-size: 30px;
    .ico{
        font-size: 40px;
    }
    .text{
        font-size: 16px;
        margin: 10px 0;
    }
}
</style>