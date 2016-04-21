export default [
    {
        name: 'BD系统',
        href: '/bd',
        children: [
            {
                name: '我的影院',
                href: '/bd/my_cinema'
            },
            {
                name: '流程中心',
                href: '',
                children: [
                    {
                        name: '上线申请',
                        href: '/bd/apply/online'
                    },
                    {
                        name: '调价申请',
                        href: '/bd/apply/adjust_price'
                    },
                    {
                        name: '影院活动申请',
                        href: '/bd/apply/cinema_activity'
                    }
                ]
            },
            {
                name: '天天平价',
                href: '',
                children: [
                    {
                        name: '竞对结算价',
                        href: '/bd/price/competitive_price'
                    },
                    {
                        name: '竞对售价',
                        href: '/bd/price/competitive_sell_price'
                    }
                ]
            },
            {
                name: '统计报表',
                href: '/bd/count_report'
            },
            {
                name: '猫眼任务',
                href: '/bd/task/task_list'
            },
            {
                name: '我的绩效',
                href: '/bd/performance/manage'
            },
            {
                name: '帮助中心',
                href: '',
                children: [
                    {
                        name: '产品功能',
                        href: '/bd/help/features'
                    },
                    {
                        name: '常见问题',
                        href: '/bd/help/question'
                    }

                ]
            }
        ]
    },
    {
        name: '后台系统',
        href: '/admin',
        children: [
            {
                name: '影院活动管理',
                href: '/admin/cinema_activity'
            },
            {
                name: '架构管理',
                href: '/admin/org-manage/region'
            },
            {
                name: 'KA 管理',
                href: '/admin/ka'
            },
            {
                name: '绩效管理',
                href: '/admin/performance/manage'
            },
            {
                name: '任务发布管理',
                href: '/admin/task/task_list'
            },
            {
                name: '帮助中心管理',
                href: '',
                children: [
                    {
                        name: '产品功能',
                        href: '/admin/help/features'
                    },
                    {
                        name: '常见问题',
                        href: '/admin/help/question'
                    }

                ]
            }
        ]
    }
];
