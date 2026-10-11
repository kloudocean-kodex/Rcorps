"""Regenerate the public brochure from the same service catalogue as the website.
Requires reportlab, fonttools and brotli. No private company documents are copied.
"""
from pathlib import Path
from io import BytesIO
import json, subprocess
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4

root=Path(__file__).resolve().parents[1]
catalog=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {services} from './content/services.mjs';console.log(JSON.stringify(services));"],cwd=root,text=True,encoding='utf-8'))
for name,source,weight in [('Body','latin-2.woff2',400),('Bold','latin-2.woff2',700),('Editorial','editorial.woff2',400)]:
    font=TTFont(root/'public/assets/fonts'/source)
    if 'fvar' in font:font=instantiateVariableFont(font,{'wght':weight},inplace=True)
    font.flavor=None
    stream=BytesIO();font.save(stream);stream.seek(0)
    pdfmetrics.registerFont(RLFont(name,stream))
out=root/'public/downloads/R-CORPS-Service-Guide.pdf';out.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(out),pagesize=A4);W,H=A4
navy=HexColor('#101c23');gold=HexColor('#ab8b4b');red=HexColor('#a32330');muted=HexColor('#536057')
logo=ImageReader(str(root/'public/assets/logo.png'))
def text(s,x,y,size=9,font='Body',color=navy):
    c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,s)
def wrap(s,width,size=9,font='Body'):
    words=s.split();lines=[];line=''
    for word in words:
        trial=(line+' '+word).strip()
        if pdfmetrics.stringWidth(trial,font,size)>width and line:lines.append(line);line=word
        else:line=trial
    if line:lines.append(line)
    return lines
def header(page):
    c.setFillColor(navy);c.rect(0,H-100,W,100,fill=1,stroke=0);c.drawImage(logo,42,H-77,width=35,height=43,mask='auto')
    text('R CORPS',91,H-49,21,'Bold',HexColor('#ffffff'));text('SECURITY SERVICES',91,H-67,8,'Body',gold)
    text('SERVICE GUIDE',W-153,H-48,9,'Bold',gold);text(f'{page} / 2',W-153,H-67,8,'Body',HexColor('#ffffff'))
    c.setFillColor(gold);c.rect(0,H-103,W,3,fill=1,stroke=0)
    c.saveState();c.setFillAlpha(.035);c.drawImage(logo,180,240,width=235,height=270,mask='auto');c.restoreState()
def footer():
    c.setStrokeColor(HexColor('#dcd8cc'));c.line(42,64,W-42,64)
    text('+91 91121 71015  |  info@rcorpssecurity.com',42,48,8)
    text('rcorpssecurity.com  |  Instagram: @corps.security',42,34,8)
def cards(items,start_y):
    width=(W-100)/2
    for i,s in enumerate(items):
        x=42+(i%2)*(width+16);y=start_y-(i//2)*119
        text(f'{catalog.index(s)+1:02d} / {s["category"].upper()}',x,y,6.7,'Bold',gold)
        title=wrap(s['name'],width,11,'Bold')
        for j,line in enumerate(title):text(line,x,y-18-j*14,11,'Bold')
        yy=y-24-len(title)*14
        for line in wrap(s['desc'],width,8.2):text(line,x,yy,8.2,'Body',muted);yy-=12
        text('Explore the detailed service guide online.',x,yy-5,7.4,'Body',red)
        c.linkURL('https://rcorpssecurity.com/services/'+s['slug']+'/',(x,yy-9,x+width,y+10),relative=0)
header(1)
text('Your world. Our attention.',42,H-144,30,'Editorial')
text('Professional security starts with a clear requirement.',42,H-173,11,'Bold')
for i,line in enumerate(wrap('Explore guarding, events, personal protection and support roles. Share your general location, dates and duties on WhatsApp; R CORPS will confirm suitable personnel, availability and the quotation.',W-84,9)):
    text(line,42,H-193-i*14,9,'Body',muted)
cards(catalog[:6],H-254)
text('START WITH WHATSAPP',42,123,8,'Bold',gold)
text('Call or message +91 91121 71015',42,102,13,'Bold')
c.linkURL('https://wa.me/919112171015',(42,92,W-42,140),relative=0)
footer();c.showPage()
header(2);text('The right role. Clearly defined.',42,H-145,29,'Editorial')
cards(catalog[6:],H-181)
text('FROM ENQUIRY TO AGREED SCOPE',42,164,8,'Bold',gold)
steps=['Share the requirement','Discuss the setting','Review the quotation','Agree deployment','Stay connected']
for i,title in enumerate(steps):
    x=42+i*((W-84)/5);text(f'{i+1:02d}',x,143,11,'Bold',red)
    for j,line in enumerate(wrap(title,89,8,'Bold')):text(line,x,128-j*11,8,'Bold')
for i,line in enumerate(wrap('Scope, personnel, equipment, permissions where applicable and availability are confirmed for each assignment. Photographs and branding do not guarantee a particular team, vehicle or certification.',W-84,7)):
    text(line,42,89-i*10,7,'Body',muted)
footer();c.setTitle('R CORPS | Service Guide');c.setAuthor('R CORPS Security Services');c.save()
print(f'Created {out.name}: {len(catalog)} service categories, 2 pages')
