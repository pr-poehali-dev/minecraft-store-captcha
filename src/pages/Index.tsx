import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaAnswer] = useState(Math.floor(Math.random() * 10) + 1);
  const [selectedDonatePackage, setSelectedDonatePackage] = useState<string | null>(null);

  const donatePackages = [
    {
      id: 'vip',
      title: 'VIP',
      price: '299₽',
      features: ['Приставка [VIP]', 'Доступ к /kit vip', '5 приватных регионов', 'Цветной ник'],
      icon: 'Star',
      color: 'from-yellow-600 to-yellow-800'
    },
    {
      id: 'premium',
      title: 'Premium',
      price: '499₽',
      features: ['Приставка [PREMIUM]', 'Доступ к /kit premium', '10 приватных регионов', 'Цветной ник', '/fly на спавне'],
      icon: 'Crown',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'legend',
      title: 'Legend',
      price: '999₽',
      features: ['Приставка [LEGEND]', 'Доступ ко всем /kit', 'Безлимит регионов', 'Цветной ник', '/fly везде', 'Уникальные эффекты'],
      icon: 'Zap',
      color: 'from-red-600 to-orange-600'
    }
  ];

  const news = [
    {
      id: 1,
      title: 'Обновление 2.0',
      date: '15 ноября 2024',
      description: 'Добавлены новые биомы, мобы и улучшенная система квестов!',
      icon: 'Sparkles'
    },
    {
      id: 2,
      title: 'PvP Турнир',
      date: '10 ноября 2024',
      description: 'Состоится большой PvP турнир с призовым фондом 5000₽!',
      icon: 'Swords'
    },
    {
      id: 3,
      title: 'Новый спавн',
      date: '5 ноября 2024',
      description: 'Обновленный спавн сервера в стиле средневекового замка.',
      icon: 'Castle'
    }
  ];

  const faqItems = [
    {
      question: 'Как зайти на сервер?',
      answer: 'Откройте Minecraft, нажмите "Сетевая игра" и добавьте IP: play.yourserver.net'
    },
    {
      question: 'Какая версия Minecraft поддерживается?',
      answer: 'Мы поддерживаем версии от 1.16 до 1.20.4'
    },
    {
      question: 'Как получить донат-привилегии?',
      answer: 'Выберите пакет в разделе "Донат", заполните форму и пройдите капчу для оплаты'
    },
    {
      question: 'Есть ли возврат средств?',
      answer: 'Возврат возможен в течение 24 часов при технических проблемах'
    }
  ];

  const handleDonateSubmit = (pkg: any) => {
    const userAnswer = parseInt(captchaValue);
    
    if (!captchaValue) {
      toast({
        title: '⚠️ Ошибка',
        description: 'Пожалуйста, решите капчу',
        variant: 'destructive'
      });
      return;
    }

    if (userAnswer !== captchaAnswer) {
      toast({
        title: '❌ Капча неверна',
        description: 'Попробуйте еще раз',
        variant: 'destructive'
      });
      setCaptchaValue('');
      return;
    }

    toast({
      title: '✅ Успешно!',
      description: `Переход к оплате пакета ${pkg.title}...`,
    });
    
    setCaptchaValue('');
    setSelectedDonatePackage(null);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-2xl animate-glow">
                ⛏️
              </div>
              <h1 className="text-lg md:text-xl font-heading text-primary">MC SHOP</h1>
            </div>
            <div className="flex gap-2 md:gap-4">
              {['home', 'donate', 'news', 'faq'].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => scrollToSection(section)}
                  className="text-xs md:text-sm"
                >
                  {section === 'home' && 'Главная'}
                  {section === 'donate' && 'Донат'}
                  {section === 'news' && 'Новости'}
                  {section === 'faq' && 'FAQ'}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 md:py-32 container mx-auto px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-heading text-primary leading-tight">
            Добро пожаловать
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Лучший сервер Minecraft с уникальными возможностями
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded border border-border">
              <Icon name="Users" className="text-primary" size={24} />
              <span className="text-lg">Онлайн: <span className="text-primary font-bold">245</span></span>
            </div>
            <div className="flex items-center gap-2 bg-card px-6 py-3 rounded border border-border">
              <Icon name="Server" className="text-secondary" size={24} />
              <span className="text-lg">IP: <span className="text-secondary font-bold">play.server.net</span></span>
            </div>
          </div>
          <div className="pt-8">
            <Button size="lg" className="text-lg px-8 py-6 animate-glow" onClick={() => scrollToSection('donate')}>
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Купить привилегии
            </Button>
          </div>
        </div>
      </section>

      <section id="donate" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading text-center text-primary mb-12">
            💎 Донат-привилегии
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {donatePackages.map((pkg) => (
              <Card key={pkg.id} className="relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-heading">{pkg.title}</CardTitle>
                    <Icon name={pkg.icon as any} className="text-primary" size={32} />
                  </div>
                  <CardDescription className="text-3xl font-bold text-primary">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedDonatePackage(pkg.id)}
                  >
                    Купить
                  </Button>
                  
                  {selectedDonatePackage === pkg.id && (
                    <div className="mt-4 p-4 bg-muted rounded animate-fade-in space-y-4">
                      <div>
                        <Label htmlFor="nickname">Никнейм в игре</Label>
                        <Input id="nickname" placeholder="Steve" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="player@example.com" className="mt-1" />
                      </div>
                      <div className="bg-card p-4 rounded border border-border">
                        <Label className="text-accent font-bold">🤖 Капча: Сколько будет {captchaAnswer} + 0?</Label>
                        <Input
                          value={captchaValue}
                          onChange={(e) => setCaptchaValue(e.target.value)}
                          placeholder="Ваш ответ"
                          className="mt-2"
                          type="number"
                        />
                      </div>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/80"
                        onClick={() => handleDonateSubmit(pkg)}
                      >
                        Перейти к оплате
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading text-center text-primary mb-12">
            📰 Новости
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {news.map((item) => (
              <Card key={item.id} className="hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={item.icon as any} className="text-secondary" size={24} />
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading text-center text-primary mb-12">
            ❓ Вопросы и ответы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-card px-6 rounded border border-border">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 MC SHOP. Все права защищены.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="ghost" size="sm">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Mail" size={20} />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
