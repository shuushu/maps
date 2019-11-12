<template>
    <v-dialog v-model="flag" persistent max-width="530">
        <v-card>
            <v-card-title class="headline">{{ title }}</v-card-title>
            <div class="wrap" v-html="templet"></div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="pink lighten-2" class="white--text" text @click="handleCancel">Disagree</v-btn>
                <v-btn color="indigo lighten-1" class="white--text"  text @click="handlceConfirm">Agree</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '제목',
        },
        flag: {
            type: Boolean,
            default: false,
        },
        templet: {
            type: String,
            default: '<strong>V-html</strong>내용입니다.',
        },
    },
	methods: {
		handlceConfirm() {
			this.$emit('handlceConfirm', this)
		},
		handleCancel(f) {
            this.$emit('handleCancel', f)
		},
	},
}
</script>

<style lang="scss" scoped>
.wrap{
    padding: 0 20px;
}
</style>