import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    categoria,
    dashboard,
    dashboardProducts,
    info,
    noticias,
    unidade,
    vagas,
} from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Bookmark,
    BookOpen,
    ChartColumnStacked,
    Folder,
    HandCoins,
    House,
    LayoutGrid,
    Newspaper,
    PackageSearch,
} from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Central',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Produtos',
        href: dashboardProducts(),
        icon: PackageSearch,
    },   {
        title: 'Unidades',
        href: unidade(),
        icon: Bookmark,
    },
    {
        title: 'Categorias',
        href: categoria(),
        icon: ChartColumnStacked,
    },
    {
        title: 'Costumizacão',
        href: info(),
        icon: House,
    }, {
        title: 'Vagas',
        href: vagas(),
        icon: HandCoins,
    },{
        title: 'Noticias',
        href: noticias(),
        icon: Newspaper,
    },


];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio',
        href: '#',
        icon: Folder,
    },
    {
        title: 'Documentacão',
        href: '#',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
