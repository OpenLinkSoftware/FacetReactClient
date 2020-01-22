export default 
`
<?xml version="1.0"?>
<query xmlns="http://openlinksw.com/services/facets/1.0">
  <text>recycling</text>
  <class iri="http://schema.org/Business" />
  <property iri="http://schema.org/makesOffer">
    <property iri="http://schema.org/businessFunction">
      <value datatype="uri">http://purl.org/goodrelations/v1#Dispose</value>
    </property>
    <property iri="http://schema.org/itemOffered">
      <class iri="http://schema.org/Product" />
      <property iri="http://schema.org/material">
        <value>"asbestos"</value>
      </property>
    </property>
  </property>
  <view type="list" limit="100" />
</query>
`