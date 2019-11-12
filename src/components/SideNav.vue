<template>
    <aside id="aside">
        <div class="list" v-for="nav in items" :key="`items-${nav.icon}`">
            <v-btn :to="nav.url" flat icon :color="`${nav.color} lighten-2`" exact>
                <v-icon>{{ nav.icon }}</v-icon>
                <span class="btn-label">{{ nav.txt }}</span>
            </v-btn>
        </div>

    </aside>
</template>

<script>
    export default {
        name: 'SideNav',
        data() {
            return {
                items: [
                    {
                        icon: 'favorite',
                        txt: '가고싶어요',
                        url: '/wish?page=1',
                        color: 'red',
                    },
                    {
                        icon: 'check_circle',
                        txt: '갔다왔어요',
                        url: '/reviews?page=1',
                        color: 'pink',
                    },
                    {
                        icon: 'star',
                        txt: '구독멤버',
                        url: '/subdescript',
                        color: 'purple',
                    },
                    {
                        icon: 'dashboard',
                        txt: '공지사항',
                        url: '/board/notice',
                        color: 'blue',
                    },
                    {
                        icon: 'help',
                        txt: '도움말',
                        url: '/board/faq',
                        color: 'gray',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    $header-height: 68px;
    #aside{
        position: relative;
        z-index: 11;
        width: 80px;
        margin-top: $header-height;
        border-right: 1px solid #ccc;
        background-color: #fff;
        text-align: center;
        .list{
            padding: 0 15px ;
            border-bottom: 1px solid #ccc;
            padding-bottom: 20px;
        }
        .v-btn__content{
            width: 50px;
        }
        .btn-label{
            position: absolute;
            font-size: 12px;
            margin-top: 23px;
        }
        .v-btn--active .btn-label{
            font-weight: bold;
            text-decoration: underline;
        }

    }

</style>