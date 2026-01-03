interface HeaderProps {
  logo?: string;
  pages?: string[];
  buttons?: string[];
  showLogo: boolean;
  user: { name: string; avatar?: string } | null;
}
